using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        public UsersController(UserService userService)
        {
            _userService = userService;
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
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }
            return Ok(user);
        }
        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(User user)
        {
            bool emailExists = await _userService.EmailExistsAsync(user.Email);

            if(emailExists)
            {
                return Conflict("Email already exists.");
            }
            await _userService.AddUserAsync(user);
            return Ok(user);
        }
    }
}
