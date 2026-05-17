using Diffy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Seed;

public static class SeedGenres
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GenreEntity>().HasData(
            new GenreEntity { Id = 1, Name = "Action" },
            new GenreEntity { Id = 2, Name = "RPG" },
            new GenreEntity { Id = 3, Name = "Adventure" },
            new GenreEntity { Id = 4, Name = "Strategy" },
            new GenreEntity { Id = 5, Name = "Simulation" }
        );
    }
}