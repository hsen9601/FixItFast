using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; } = null!;

        [Column(TypeName = "nvarchar(16)")]
        public string Mobile { get; set; } = null!;

        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; } = null!;

        [Column(TypeName = "nvarchar(100)")]
        public string Address { get; set; } = null!;
        public int Age { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string Type { get; set; } = null!;

        [Column(TypeName = "nvarchar(100)")]
        public string Password { get; set; } = null!;



    }

}
