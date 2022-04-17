using AcmeClubBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AcmeClubBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
            public DbSet<Registration> Registrations { get; set; }
           
    }
}
