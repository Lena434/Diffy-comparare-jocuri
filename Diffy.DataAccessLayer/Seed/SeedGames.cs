using Diffy.Domain.Entities.Game;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Seed;

public static class SeedGames
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameEntity>().HasData(
            new GameEntity { Id = 1, Title = "The Witcher 3: Wild Hunt", Description = "An open-world RPG set in a dark fantasy universe.", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseYear = 2015, Price = 29.99m, ImageUrl = null },
            new GameEntity { Id = 2, Title = "Elden Ring", Description = "An action RPG set in a vast open world created by Hidetaka Miyazaki and George R. R. Martin.", Developer = "FromSoftware", Publisher = "Bandai Namco", ReleaseYear = 2022, Price = 59.99m, ImageUrl = null },
            new GameEntity { Id = 3, Title = "Cyberpunk 2077", Description = "An open-world action RPG set in the megalopolis of Night City.", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseYear = 2020, Price = 39.99m, ImageUrl = null },
            new GameEntity { Id = 4, Title = "Hades", Description = "A rogue-like dungeon crawler where you play as the son of the god of the dead.", Developer = "Supergiant Games", Publisher = "Supergiant Games", ReleaseYear = 2020, Price = 24.99m, ImageUrl = null },
            new GameEntity { Id = 5, Title = "Stardew Valley", Description = "A farming simulation RPG where you build and manage your own farm.", Developer = "ConcernedApe", Publisher = "ConcernedApe", ReleaseYear = 2016, Price = 14.99m, ImageUrl = null }
        );

        // Genres: 1=Action, 2=RPG, 3=Adventure, 4=Strategy, 5=Simulation
        modelBuilder.Entity<GameGenreEntity>().HasData(
            new GameGenreEntity { GameId = 1, GenreId = 2 }, // Witcher 3 -> RPG
            new GameGenreEntity { GameId = 1, GenreId = 3 }, // Witcher 3 -> Adventure
            new GameGenreEntity { GameId = 2, GenreId = 1 }, // Elden Ring -> Action
            new GameGenreEntity { GameId = 2, GenreId = 2 }, // Elden Ring -> RPG
            new GameGenreEntity { GameId = 3, GenreId = 1 }, // Cyberpunk -> Action
            new GameGenreEntity { GameId = 3, GenreId = 2 }, // Cyberpunk -> RPG
            new GameGenreEntity { GameId = 4, GenreId = 1 }, // Hades -> Action
            new GameGenreEntity { GameId = 5, GenreId = 5 }  // Stardew -> Simulation
        );

        // Platforms: 1=PC, 2=PlayStation 5, 3=Xbox Series X, 4=Nintendo Switch
        modelBuilder.Entity<GamePlatformEntity>().HasData(
            new GamePlatformEntity { GameId = 1, PlatformId = 1 }, // Witcher 3 -> PC
            new GamePlatformEntity { GameId = 1, PlatformId = 2 }, // Witcher 3 -> PS5
            new GamePlatformEntity { GameId = 2, PlatformId = 1 }, // Elden Ring -> PC
            new GamePlatformEntity { GameId = 2, PlatformId = 2 }, // Elden Ring -> PS5
            new GamePlatformEntity { GameId = 2, PlatformId = 3 }, // Elden Ring -> Xbox
            new GamePlatformEntity { GameId = 3, PlatformId = 1 }, // Cyberpunk -> PC
            new GamePlatformEntity { GameId = 3, PlatformId = 2 }, // Cyberpunk -> PS5
            new GamePlatformEntity { GameId = 4, PlatformId = 1 }, // Hades -> PC
            new GamePlatformEntity { GameId = 4, PlatformId = 4 }, // Hades -> Switch
            new GamePlatformEntity { GameId = 5, PlatformId = 1 }, // Stardew -> PC
            new GamePlatformEntity { GameId = 5, PlatformId = 4 }  // Stardew -> Switch
        );

        // GameModes: 1=Single Player, 2=Multiplayer, 3=Co-op
        modelBuilder.Entity<GameGameModeEntity>().HasData(
            new GameGameModeEntity { GameId = 1, GameModeId = 1 }, // Witcher 3 -> Single Player
            new GameGameModeEntity { GameId = 2, GameModeId = 1 }, // Elden Ring -> Single Player
            new GameGameModeEntity { GameId = 2, GameModeId = 2 }, // Elden Ring -> Multiplayer
            new GameGameModeEntity { GameId = 3, GameModeId = 1 }, // Cyberpunk -> Single Player
            new GameGameModeEntity { GameId = 4, GameModeId = 1 }, // Hades -> Single Player
            new GameGameModeEntity { GameId = 5, GameModeId = 1 }, // Stardew -> Single Player
            new GameGameModeEntity { GameId = 5, GameModeId = 3 }  // Stardew -> Co-op
        );
    }
}