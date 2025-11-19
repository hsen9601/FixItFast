namespace FixItFast.Domain
{
    public class ApplicationUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Username { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string Role { get; set; } = "Customer"; // Customer, Craftsman, Admin
    }

    public class ServiceRequest
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string CustomerId { get; set; } = "";
        public string? CraftsmanId { get; set; }
        public string Status { get; set; } = "Open"; // Open, Accepted, Completed, Cancelled
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
