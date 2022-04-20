using System.ComponentModel.DataAnnotations;

namespace AcmeClubBackend.Models
{
    public class Registration
    {
        public int Id {  get; set; }
        [Required]
        public string? FirstName { get; set; }
        
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public DateTime? StartDate { get; set; } 
        public string? YearsOfExperience { get; set; }
        [Required]
        public string? Activity { get; set; } 
        public string? Comments { get; set; }

    }
}
