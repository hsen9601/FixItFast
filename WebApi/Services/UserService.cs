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
    }
}
