using Diffy.Domain.Entities.Game;
using Microsoft.EntityFrameworkCore;

namespace Diffy.DataAccessLayer.Seed;

public static class SeedGames
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameEntity>().HasData(
            new GameEntity { Id = 1, Title = "The Witcher 3: Wild Hunt", Description = "An open-world RPG set in a dark fantasy universe.", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseYear = 2015, Price = 29.99m },
            new GameEntity { Id = 2, Title = "Elden Ring", Description = "An action RPG set in a vast open world created by Hidetaka Miyazaki and George R. R. Martin.", Developer = "FromSoftware", Publisher = "Bandai Namco", ReleaseYear = 2022, Price = 59.99m },
            new GameEntity { Id = 3, Title = "Cyberpunk 2077", Description = "An open-world action RPG set in the megalopolis of Night City.", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseYear = 2020, Price = 39.99m },
            new GameEntity { Id = 4, Title = "Hades", Description = "A rogue-like dungeon crawler where you play as the son of the god of the dead.", Developer = "Supergiant Games", Publisher = "Supergiant Games", ReleaseYear = 2020, Price = 24.99m },
            new GameEntity { Id = 5, Title = "Stardew Valley", Description = "A farming simulation RPG where you build and manage your own farm.", Developer = "ConcernedApe", Publisher = "ConcernedApe", ReleaseYear = 2016, Price = 14.99m },
            new GameEntity { Id = 6, Title = "Fortnite", Description = "A free-to-play battle royale game where 100 players fight to be the last one standing.", Developer = "Epic Games", Publisher = "Epic Games", ReleaseYear = 2017, Price = 0m },
            new GameEntity { Id = 7, Title = "League of Legends", Description = "A fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements.", Developer = "Riot Games", Publisher = "Riot Games", ReleaseYear = 2009, Price = 0m },
            new GameEntity { Id = 8, Title = "Dota 2", Description = "A multiplayer online battle arena game where two teams of five players compete to destroy the enemy's base.", Developer = "Valve", Publisher = "Valve", ReleaseYear = 2013, Price = 0m },
            new GameEntity { Id = 9, Title = "Apex Legends", Description = "A free-to-play battle royale hero shooter set in the Titanfall universe.", Developer = "Respawn Entertainment", Publisher = "Electronic Arts", ReleaseYear = 2019, Price = 0m },
            new GameEntity { Id = 10, Title = "Minecraft", Description = "A sandbox game where players build and explore procedurally generated worlds made of blocks.", Developer = "Mojang Studios", Publisher = "Microsoft", ReleaseYear = 2011, Price = 29.99m },
            new GameEntity { Id = 11, Title = "Among Us", Description = "A multiplayer social deduction game set in a space-themed setting where crewmates must identify impostors.", Developer = "InnerSloth", Publisher = "InnerSloth", ReleaseYear = 2018, Price = 4.99m },
            new GameEntity { Id = 12, Title = "Terraria", Description = "A side-scrolling action-adventure sandbox game with exploration, crafting, building, and combat.", Developer = "Re-Logic", Publisher = "Re-Logic", ReleaseYear = 2011, Price = 9.99m },
            new GameEntity { Id = 13, Title = "Hollow Knight", Description = "A challenging action-adventure game set in a vast, ruined kingdom of insects and heroes.", Developer = "Team Cherry", Publisher = "Team Cherry", ReleaseYear = 2017, Price = 14.99m },
            new GameEntity { Id = 14, Title = "Portal 2", Description = "A first-person puzzle game where players use a portal gun to solve increasingly complex challenges.", Developer = "Valve", Publisher = "Valve", ReleaseYear = 2011, Price = 9.99m },
            new GameEntity { Id = 15, Title = "Civilization VI", Description = "A turn-based strategy game where you build an empire to stand the test of time.", Developer = "Firaxis Games", Publisher = "2K Games", ReleaseYear = 2016, Price = 59.99m },
            new GameEntity { Id = 16, Title = "God of War", Description = "An action-adventure game following Kratos and his son Atreus through Norse mythology.", Developer = "Santa Monica Studio", Publisher = "Sony Interactive Entertainment", ReleaseYear = 2018, Price = 49.99m },
            new GameEntity { Id = 17, Title = "Red Dead Redemption 2", Description = "An epic tale of life in America at the dawn of the modern age, set in the American frontier.", Developer = "Rockstar Games", Publisher = "Rockstar Games", ReleaseYear = 2018, Price = 59.99m },
            new GameEntity { Id = 18, Title = "Dark Souls III", Description = "An action RPG set in a dark fantasy world where you face relentless enemies and epic bosses.", Developer = "FromSoftware", Publisher = "Bandai Namco", ReleaseYear = 2016, Price = 39.99m },
            new GameEntity { Id = 19, Title = "Disco Elysium", Description = "A groundbreaking open-world RPG where you play as a detective with a unique skill system.", Developer = "ZA/UM", Publisher = "ZA/UM", ReleaseYear = 2019, Price = 39.99m },
            new GameEntity { Id = 20, Title = "The Legend of Zelda: Breath of the Wild", Description = "An open-world action-adventure game set in the kingdom of Hyrule.", Developer = "Nintendo", Publisher = "Nintendo", ReleaseYear = 2017, Price = 59.99m }
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
            new GameGenreEntity { GameId = 5, GenreId = 5 },  // Stardew -> Simulation
            new GameGenreEntity { GameId = 6, GenreId = 1 },  // Fortnite -> Action
            new GameGenreEntity { GameId = 7, GenreId = 1 },  // LoL -> Action
            new GameGenreEntity { GameId = 7, GenreId = 4 },  // LoL -> Strategy
            new GameGenreEntity { GameId = 8, GenreId = 4 },  // Dota 2 -> Strategy
            new GameGenreEntity { GameId = 8, GenreId = 1 },  // Dota 2 -> Action
            new GameGenreEntity { GameId = 9, GenreId = 1 },  // Apex -> Action
            new GameGenreEntity { GameId = 10, GenreId = 5 }, // Minecraft -> Simulation
            new GameGenreEntity { GameId = 10, GenreId = 3 }, // Minecraft -> Adventure
            new GameGenreEntity { GameId = 11, GenreId = 4 }, // Among Us -> Strategy
            new GameGenreEntity { GameId = 12, GenreId = 1 }, // Terraria -> Action
            new GameGenreEntity { GameId = 12, GenreId = 3 }, // Terraria -> Adventure
            new GameGenreEntity { GameId = 12, GenreId = 5 }, // Terraria -> Simulation
            new GameGenreEntity { GameId = 13, GenreId = 1 }, // Hollow Knight -> Action
            new GameGenreEntity { GameId = 13, GenreId = 3 }, // Hollow Knight -> Adventure
            new GameGenreEntity { GameId = 14, GenreId = 3 }, // Portal 2 -> Adventure
            new GameGenreEntity { GameId = 15, GenreId = 4 }, // Civ VI -> Strategy
            new GameGenreEntity { GameId = 16, GenreId = 1 }, // God of War -> Action
            new GameGenreEntity { GameId = 16, GenreId = 3 }, // God of War -> Adventure
            new GameGenreEntity { GameId = 17, GenreId = 1 }, // RDR2 -> Action
            new GameGenreEntity { GameId = 17, GenreId = 3 }, // RDR2 -> Adventure
            new GameGenreEntity { GameId = 18, GenreId = 1 }, // Dark Souls III -> Action
            new GameGenreEntity { GameId = 18, GenreId = 2 }, // Dark Souls III -> RPG
            new GameGenreEntity { GameId = 19, GenreId = 2 }, // Disco Elysium -> RPG
            new GameGenreEntity { GameId = 19, GenreId = 3 }, // Disco Elysium -> Adventure
            new GameGenreEntity { GameId = 20, GenreId = 1 }, // Zelda BotW -> Action
            new GameGenreEntity { GameId = 20, GenreId = 3 }  // Zelda BotW -> Adventure
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
            new GamePlatformEntity { GameId = 5, PlatformId = 4 },  // Stardew -> Switch
            new GamePlatformEntity { GameId = 6, PlatformId = 1 },  // Fortnite -> PC
            new GamePlatformEntity { GameId = 6, PlatformId = 2 },  // Fortnite -> PS5
            new GamePlatformEntity { GameId = 6, PlatformId = 3 },  // Fortnite -> Xbox
            new GamePlatformEntity { GameId = 7, PlatformId = 1 },  // LoL -> PC
            new GamePlatformEntity { GameId = 8, PlatformId = 1 },  // Dota 2 -> PC
            new GamePlatformEntity { GameId = 9, PlatformId = 1 },  // Apex -> PC
            new GamePlatformEntity { GameId = 9, PlatformId = 2 },  // Apex -> PS5
            new GamePlatformEntity { GameId = 9, PlatformId = 3 },  // Apex -> Xbox
            new GamePlatformEntity { GameId = 10, PlatformId = 1 }, // Minecraft -> PC
            new GamePlatformEntity { GameId = 10, PlatformId = 2 }, // Minecraft -> PS5
            new GamePlatformEntity { GameId = 10, PlatformId = 3 }, // Minecraft -> Xbox
            new GamePlatformEntity { GameId = 10, PlatformId = 4 }, // Minecraft -> Switch
            new GamePlatformEntity { GameId = 11, PlatformId = 1 }, // Among Us -> PC
            new GamePlatformEntity { GameId = 11, PlatformId = 4 }, // Among Us -> Switch
            new GamePlatformEntity { GameId = 12, PlatformId = 1 }, // Terraria -> PC
            new GamePlatformEntity { GameId = 12, PlatformId = 4 }, // Terraria -> Switch
            new GamePlatformEntity { GameId = 13, PlatformId = 1 }, // Hollow Knight -> PC
            new GamePlatformEntity { GameId = 13, PlatformId = 4 }, // Hollow Knight -> Switch
            new GamePlatformEntity { GameId = 14, PlatformId = 1 }, // Portal 2 -> PC
            new GamePlatformEntity { GameId = 15, PlatformId = 1 }, // Civ VI -> PC
            new GamePlatformEntity { GameId = 16, PlatformId = 1 }, // God of War -> PC
            new GamePlatformEntity { GameId = 16, PlatformId = 2 }, // God of War -> PS5
            new GamePlatformEntity { GameId = 17, PlatformId = 1 }, // RDR2 -> PC
            new GamePlatformEntity { GameId = 17, PlatformId = 2 }, // RDR2 -> PS5
            new GamePlatformEntity { GameId = 17, PlatformId = 3 }, // RDR2 -> Xbox
            new GamePlatformEntity { GameId = 18, PlatformId = 1 }, // Dark Souls III -> PC
            new GamePlatformEntity { GameId = 18, PlatformId = 2 }, // Dark Souls III -> PS5
            new GamePlatformEntity { GameId = 18, PlatformId = 3 }, // Dark Souls III -> Xbox
            new GamePlatformEntity { GameId = 19, PlatformId = 1 }, // Disco Elysium -> PC
            new GamePlatformEntity { GameId = 20, PlatformId = 4 }  // Zelda BotW -> Switch
        );

        // GameModes: 1=Single Player, 2=Multiplayer, 3=Co-op
        modelBuilder.Entity<GameGameModeEntity>().HasData(
            new GameGameModeEntity { GameId = 1, GameModeId = 1 }, // Witcher 3 -> Single Player
            new GameGameModeEntity { GameId = 2, GameModeId = 1 }, // Elden Ring -> Single Player
            new GameGameModeEntity { GameId = 2, GameModeId = 2 }, // Elden Ring -> Multiplayer
            new GameGameModeEntity { GameId = 3, GameModeId = 1 }, // Cyberpunk -> Single Player
            new GameGameModeEntity { GameId = 4, GameModeId = 1 }, // Hades -> Single Player
            new GameGameModeEntity { GameId = 5, GameModeId = 1 }, // Stardew -> Single Player
            new GameGameModeEntity { GameId = 5, GameModeId = 3 },  // Stardew -> Co-op
            new GameGameModeEntity { GameId = 6, GameModeId = 2 },  // Fortnite -> Multiplayer
            new GameGameModeEntity { GameId = 7, GameModeId = 2 },  // LoL -> Multiplayer
            new GameGameModeEntity { GameId = 8, GameModeId = 2 },  // Dota 2 -> Multiplayer
            new GameGameModeEntity { GameId = 9, GameModeId = 2 },  // Apex -> Multiplayer
            new GameGameModeEntity { GameId = 9, GameModeId = 3 },  // Apex -> Co-op
            new GameGameModeEntity { GameId = 10, GameModeId = 1 }, // Minecraft -> Single Player
            new GameGameModeEntity { GameId = 10, GameModeId = 3 }, // Minecraft -> Co-op
            new GameGameModeEntity { GameId = 11, GameModeId = 2 }, // Among Us -> Multiplayer
            new GameGameModeEntity { GameId = 12, GameModeId = 1 }, // Terraria -> Single Player
            new GameGameModeEntity { GameId = 12, GameModeId = 3 }, // Terraria -> Co-op
            new GameGameModeEntity { GameId = 13, GameModeId = 1 }, // Hollow Knight -> Single Player
            new GameGameModeEntity { GameId = 14, GameModeId = 1 }, // Portal 2 -> Single Player
            new GameGameModeEntity { GameId = 14, GameModeId = 3 }, // Portal 2 -> Co-op
            new GameGameModeEntity { GameId = 15, GameModeId = 1 }, // Civ VI -> Single Player
            new GameGameModeEntity { GameId = 15, GameModeId = 2 }, // Civ VI -> Multiplayer
            new GameGameModeEntity { GameId = 16, GameModeId = 1 }, // God of War -> Single Player
            new GameGameModeEntity { GameId = 17, GameModeId = 1 }, // RDR2 -> Single Player
            new GameGameModeEntity { GameId = 17, GameModeId = 2 }, // RDR2 -> Multiplayer
            new GameGameModeEntity { GameId = 18, GameModeId = 1 }, // Dark Souls III -> Single Player
            new GameGameModeEntity { GameId = 18, GameModeId = 2 }, // Dark Souls III -> Multiplayer
            new GameGameModeEntity { GameId = 19, GameModeId = 1 }, // Disco Elysium -> Single Player
            new GameGameModeEntity { GameId = 20, GameModeId = 1 }  // Zelda BotW -> Single Player
        );
        
        //GameImgEntity - Image URLs
        modelBuilder.Entity<GameImgEntity>().HasData(
            new GameImgEntity { Id = 1, GameId = 1, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg" },
            new GameImgEntity { Id = 2, GameId = 2, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" },
            new GameImgEntity { Id = 3, GameId = 3, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg" },
            new GameImgEntity { Id = 4, GameId = 4, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg" },
            new GameImgEntity { Id = 5, GameId = 5, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg" },
            new GameImgEntity { Id = 6, GameId = 6, ImgUrl = "https://cdn2.unrealengine.com/fortnite-og-1900x600-2e436ee544e1.jpg?resize=1&w=1920" },   // Fortnite
            new GameImgEntity { Id = 7, GameId = 7, ImgUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg" },   // League of Legends
            new GameImgEntity { Id = 8, GameId = 8, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg" },   // Dota 2
            new GameImgEntity { Id = 9, GameId = 9, ImgUrl = "https://images6.alphacoders.com/992/thumb-1920-992033.jpg" },   // Apex Legends
            new GameImgEntity { Id = 10, GameId = 10, ImgUrl = "https://cdn.mobygames.com/covers/9056432-minecraft-nintendo-switch-front-cover.jpg" }, // Minecraft
            new GameImgEntity { Id = 11, GameId = 11, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg" }, // Among Us
            new GameImgEntity { Id = 12, GameId = 12, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg" }, // Terraria
            new GameImgEntity { Id = 13, GameId = 13, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg" }, // Hollow Knight
            new GameImgEntity { Id = 14, GameId = 14, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg" }, // Portal 2
            new GameImgEntity { Id = 15, GameId = 15, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg" }, // Civilization VI
            new GameImgEntity { Id = 16, GameId = 16, ImgUrl = "https://wallpapers.com/images/hd/god-of-war-kratos-and-atreus-at-river-nahx1u4rudbu55hy.webp" }, // God of War
            new GameImgEntity { Id = 17, GameId = 17, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg" }, // Red Dead Redemption 2
            new GameImgEntity { Id = 18, GameId = 18, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg" }, // Dark Souls III
            new GameImgEntity { Id = 19, GameId = 19, ImgUrl = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/632470/header.jpg" }, // Disco Elysium
            new GameImgEntity { Id = 20, GameId = 20, ImgUrl = "https://wallpaperaccess.com/full/1338654.jpg" }  // Zelda BotW
        );

    }
}