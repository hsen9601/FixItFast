using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IConfiguration _configuration;
        public UsersController(UserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("role", user.Type ?? "user")
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(double.Parse(jwtSettings["ExpireHours"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            await _userService.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userService.RemoveUserByIdAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<User?> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return user;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginPayload payload)
        {
            var user = await _userService.LoginAsync(payload.Email, payload.Password);

            if (user == null) return Unauthorized("Invalid Email or Passowrd");

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.FullName,
                    user.Email,
                    user.Address,
                    user.Mobile,
                    user.Type
                }
            });
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(User user)
        {
            if (await _userService.EmailExistsAsync(user.Email))
            {
                return Conflict("Email already exists.");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            await _userService.AddUserAsync(user);
            return Ok(new { user.Id, user.FullName, user.Email, user.Age, user.Mobile, user.Type });

        }
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.GetUserByIdAsync(int.Parse(userId));

            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Address,
                user.Mobile,
                user.Age,
                user.Type
            });
        }


    }
}
