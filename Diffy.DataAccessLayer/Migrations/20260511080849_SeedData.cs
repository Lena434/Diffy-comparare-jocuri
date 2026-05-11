using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Diffy.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "GameModes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Single Player" },
                    { 2, "Multiplayer" },
                    { 3, "Co-op" }
                });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Description", "Developer", "ImageUrl", "Price", "Publisher", "ReleaseYear", "Title" },
                values: new object[,]
                {
                    { 1, "An open-world RPG set in a dark fantasy universe.", "CD Projekt Red", null, 29.99m, "CD Projekt", 2015, "The Witcher 3: Wild Hunt" },
                    { 2, "An action RPG set in a vast open world created by Hidetaka Miyazaki and George R. R. Martin.", "FromSoftware", null, 59.99m, "Bandai Namco", 2022, "Elden Ring" },
                    { 3, "An open-world action RPG set in the megalopolis of Night City.", "CD Projekt Red", null, 39.99m, "CD Projekt", 2020, "Cyberpunk 2077" },
                    { 4, "A rogue-like dungeon crawler where you play as the son of the god of the dead.", "Supergiant Games", null, 24.99m, "Supergiant Games", 2020, "Hades" },
                    { 5, "A farming simulation RPG where you build and manage your own farm.", "ConcernedApe", null, 14.99m, "ConcernedApe", 2016, "Stardew Valley" }
                });

            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Action" },
                    { 2, "RPG" },
                    { 3, "Adventure" },
                    { 4, "Strategy" },
                    { 5, "Simulation" }
                });

            migrationBuilder.InsertData(
                table: "Platforms",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "PC" },
                    { 2, "PlayStation 5" },
                    { 3, "Xbox Series X" },
                    { 4, "Nintendo Switch" }
                });

            migrationBuilder.InsertData(
                table: "GameGameModes",
                columns: new[] { "GameId", "GameModeId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 },
                    { 2, 2 },
                    { 3, 1 },
                    { 4, 1 },
                    { 5, 1 },
                    { 5, 3 }
                });

            migrationBuilder.InsertData(
                table: "GameGenres",
                columns: new[] { "GameId", "GenreId" },
                values: new object[,]
                {
                    { 1, 2 },
                    { 1, 3 },
                    { 2, 1 },
                    { 2, 2 },
                    { 3, 1 },
                    { 3, 2 },
                    { 4, 1 },
                    { 5, 5 }
                });

            migrationBuilder.InsertData(
                table: "GamePlatforms",
                columns: new[] { "GameId", "PlatformId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 2, 1 },
                    { 2, 2 },
                    { 2, 3 },
                    { 3, 1 },
                    { 3, 2 },
                    { 4, 1 },
                    { 4, 4 },
                    { 5, 1 },
                    { 5, 4 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 5, 1 });

            migrationBuilder.DeleteData(
                table: "GameGameModes",
                keyColumns: new[] { "GameId", "GameModeId" },
                keyValues: new object[] { 5, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "GameGenres",
                keyColumns: new[] { "GameId", "GenreId" },
                keyValues: new object[] { 5, 5 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 2, 3 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 4, 4 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 5, 1 });

            migrationBuilder.DeleteData(
                table: "GamePlatforms",
                keyColumns: new[] { "GameId", "PlatformId" },
                keyValues: new object[] { 5, 4 });

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "GameModes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "GameModes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "GameModes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Genres",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Platforms",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Platforms",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Platforms",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Platforms",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
