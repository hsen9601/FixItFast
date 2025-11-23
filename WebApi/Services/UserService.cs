using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Services
{
    public class UserService
    {

        private readonly FixItFastDBContext _context;
        public UserService(FixItFastDBContext context)
        {
            _context = context;
        }
        public Task<List<User>> GetAllUsersAsync() => _context.Users.ToListAsync();
        public Task<User?> GetUserByIdAsync(int id) => _context.Users.FindAsync(id).AsTask();
        public Task<User?> GetUserByEmailAsync(string email) => _context.Users.FindAsync(email).AsTask();

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> RemoveUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<User?> LoginAsync(string mail, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == mail);

            if (user == null)
                return null;

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.Password);

            return isValidPassword ? user : null;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

    }
}
