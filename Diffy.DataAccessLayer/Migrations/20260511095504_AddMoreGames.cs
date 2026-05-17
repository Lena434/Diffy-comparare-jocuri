using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Diffy.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreGames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Description", "Developer", "Price", "Publisher", "ReleaseYear", "Title" },
                values: new object[,]
                {
                    { 6, "A free-to-play battle royale game where 100 players fight to be the last one standing.", "Epic Games", 0m, "Epic Games", 2017, "Fortnite" },
                    { 7, "A fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements.", "Riot Games", 0m, "Riot Games", 2009, "League of Legends" },
                    { 8, "A multiplayer online battle arena game where two teams of five players compete to destroy the enemy's base.", "Valve", 0m, "Valve", 2013, "Dota 2" },
                    { 9, "A free-to-play battle royale hero shooter set in the Titanfall universe.", "Respawn Entertainment", 0m, "Electronic Arts", 2019, "Apex Legends" },
                    { 10, "A sandbox game where players build and explore procedurally generated worlds made of blocks.", "Mojang Studios", 29.99m, "Microsoft", 2011, "Minecraft" },
                    { 11, "A multiplayer social deduction game set in a space-themed setting where crewmates must identify impostors.", "InnerSloth", 4.99m, "InnerSloth", 2018, "Among Us" },
                    { 12, "A side-scrolling action-adventure sandbox game with exploration, crafting, building, and combat.", "Re-Logic", 9.99m, "Re-Logic", 2011, "Terraria" },
                    { 13, "A challenging action-adventure game set in a vast, ruined kingdom of insects and heroes.", "Team Cherry", 14.99m, "Team Cherry", 2017, "Hollow Knight" },
                    { 14, "A first-person puzzle game where players use a portal gun to solve increasingly complex challenges.", "Valve", 9.99m, "Valve", 2011, "Portal 2" },
                    { 15, "A turn-based strategy game where you build an empire to stand the test of time.", "Firaxis Games", 59.99m, "2K Games", 2016, "Civilization VI" },
                    { 16, "An action-adventure game following Kratos and his son Atreus through Norse mythology.", "Santa Monica Studio", 49.99m, "Sony Interactive Entertainment", 2018, "God of War" },
                    { 17, "An epic tale of life in America at the dawn of the modern age, set in the American frontier.", "Rockstar Games", 59.99m, "Rockstar Games", 2018, "Red Dead Redemption 2" },
                    { 18, "An action RPG set in a dark fantasy world where you face relentless enemies and epic bosses.", "FromSoftware", 39.99m, "Bandai Namco", 2016, "Dark Souls III" },
                    { 19, "A groundbreaking open-world RPG where you play as a detective with a unique skill system.", "ZA/UM", 39.99m, "ZA/UM", 2019, "Disco Elysium" },
                    { 20, "An open-world action-adventure game set in the kingdom of Hyrule.", "Nintendo", 59.99m, "Nintendo", 2017, "The Legend of Zelda: Breath of the Wild" }
                });

            migrationBuilder.InsertData(
                table: "GameGameModes",
                columns: new[] { "GameId", "GameModeId" },
                values: new object[,]
                {
                    { 6, 2 },
                    { 7, 2 },
                    { 8, 2 },
                    { 9, 2 },
                    { 9, 3 },
                    { 10, 1 },
                    { 10, 3 },
                    { 11, 2 },
                    { 12, 1 },
                    { 12, 3 },
                    { 13, 1 },
                    { 14, 1 },
                    { 14, 3 },
                    { 15, 1 },
                    { 15, 2 },
                    { 16, 1 },
                    { 17, 1 },
                    { 17, 2 },
                    { 18, 1 },
                    { 18, 2 },
                    { 19, 1 },
                    { 20, 1 }
                });

            migrationBuilder.InsertData(
                table: "GameGenres",
                columns: new[] { "GameId", "GenreId" },
                values: new object[,]
                {
                    { 6, 1 },
                    { 7, 1 },
                    { 7, 4 },
                    { 8, 1 },
                    { 8, 4 },
                    { 9, 1 },
                    { 10, 3 },
                    { 10, 5 },
                    { 11, 4 },
                    { 12, 1 },
                    { 12, 3 },
                    { 12, 5 },
                    { 13, 1 },
                    { 13, 3 },
                    { 14, 3 },
                    { 15, 4 },
                    { 16, 1 },
                    { 16, 3 },
                    { 17, 1 },
                    { 17, 3 },
                    { 18, 1 },
                    { 18, 2 },
                    { 19, 2 },
                    { 19, 3 },
                    { 20, 1 },
                    { 20, 3 }
                });

            migrationBuilder.InsertData(
                table: "GameImgs",
                columns: new[] { "Id", "GameId", "ImgUrl" },
                values: new object[,]
                {
                    { 6, 6, "https://cdn2.unrealengine.com/fortnite-og-1900x600-2e436ee544e1.jpg?resize=1&w=1920" },
                    { 7, 7, "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg" },
                    { 8, 8, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg" },
                    { 9, 9, "https://images6.alphacoders.com/992/thumb-1920-992033.jpg" },
                    { 10, 10, "https://cdn.mobygames.com/covers/9056432-minecraft-nintendo-switch-front-cover.jpg" },
                    { 11, 11, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg" },
                    { 12, 12, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg" },
                    { 13, 13, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg" },
                    { 14, 14, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg" },
                    { 15, 15, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg" },
                    { 16, 16, "https://wallpapers.com/images/hd/god-of-war-kratos-and-atreus-at-river-nahx1u4rudbu55hy.webp" },
                    { 17, 17, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg" },
                    { 18, 18, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg" },
                    { 19, 19, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/632470/header.jpg" },
                    { 20, 20, "https://wallpaperaccess.com/full/1338654.jpg" }
                });

            migrationBuilder.InsertData(
                table: "GamePlatforms",
                columns: new[] { "GameId", "PlatformId" },
                values: new object[,]
                {
                    { 6, 1 },
                    { 6, 2 },
                    { 6, 3 },
                    { 7, 1 },
                    { 8, 1 },
                    { 9, 1 },
                    { 9, 2 },
                    { 9, 3 },
                    { 10, 1 },
                    { 10, 2 },
                    { 10, 3 },
                    { 10, 4 },
                    { 11, 1 },
                    { 11, 4 },
                    { 12, 1 },
                    { 12, 4 },
                    { 13, 1 },
                    { 13, 4 },
                    { 14, 1 },
                    { 15, 1 },
                    { 16, 1 },
                    { 16, 2 },
                    { 17, 1 },
                    { 17, 2 },
                    { 17, 3 },
                    { 18, 1 },
                    { 18, 2 },
                    { 18, 3 },
                    { 19, 1 },
                    { 20, 4 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 6, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 7, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 8, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 9, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 9, 3 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 10, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 10, 3 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 11, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 12, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 12, 3 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 13, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 14, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 14, 3 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 15, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 15, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 16, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 17, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 17, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 18, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 18, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 19, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 20, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 6, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 7, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 7, 4 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 8, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 8, 4 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 9, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 10, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 10, 5 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 11, 4 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 12, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 12, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 12, 5 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 13, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 13, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 14, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 15, 4 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 16, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 16, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 17, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 17, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 18, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 18, 2 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 19, 2 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 19, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 20, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 20, 3 });

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 6, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 6, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 6, 3 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 7, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 8, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 9, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 9, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 9, 3 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 10, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 10, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 10, 3 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 10, 4 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 11, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 11, 4 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 12, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 12, 4 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 13, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 13, 4 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 14, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 15, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 16, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 16, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 17, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 17, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 17, 3 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 18, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 18, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 18, 3 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 19, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 20, 4 });

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 20);
        }
    }
}
