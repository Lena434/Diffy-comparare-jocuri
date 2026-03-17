using Microsoft.EntityFrameworkCore;
using Diffy.Domain.Entities.Game;


namespace Diffy.DataAccessLayer.Context;

public class DiffyDbContext : DbContext
{
    public DbSet<GameEntity> Games { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=diffydb;Username=postgres;Password=postgres;");
        }
    }
}