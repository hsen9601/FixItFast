using FixItFast.Domain;
using Microsoft.EntityFrameworkCore;

namespace FixItFast.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> Users { get; set; } = null!;
        public DbSet<ServiceRequest> ServiceRequests { get; set; } = null!;
    }
}
