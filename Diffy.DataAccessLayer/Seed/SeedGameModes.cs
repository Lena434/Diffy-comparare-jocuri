using Diffy.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Seed;

public static class SeedGameModes
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameModeEntity>().HasData(
            new GameModeEntity { Id = 1, Name = "Single Player" },
            new GameModeEntity { Id = 2, Name = "Multiplayer" },
            new GameModeEntity { Id = 3, Name = "Co-op" }
        );
    }
}