using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
    public class FixItFastDBContext:DbContext
    {
        public FixItFastDBContext(DbContextOptions<FixItFastDBContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}
