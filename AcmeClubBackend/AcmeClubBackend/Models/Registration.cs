namespace AcmeClubBackend.Models
{
    public class Registration
    {
        public int Id {  get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; } 
        public string YearsOfExperience { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string Comments { get; set; } = string.Empty;

    }
}
