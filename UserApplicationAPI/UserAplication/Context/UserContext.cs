using Microsoft.EntityFrameworkCore;
using UserAplication.Modals;

namespace UserAplication.Context
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server = .\\SQLEXPRESS; Database = CrudUser; Trusted_Connection = true; TrustServerCertificate = true");
        }
    }
}
