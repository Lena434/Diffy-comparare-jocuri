using Diffy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Seed;

public static class SeedPlatforms
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PlatformEntity>().HasData(
            new PlatformEntity { Id = 1, Name = "PC" },
            new PlatformEntity { Id = 2, Name = "PlayStation 5" },
            new PlatformEntity { Id = 3, Name = "Xbox Series X" },
            new PlatformEntity { Id = 4, Name = "Nintendo Switch" }
        );
    }
}