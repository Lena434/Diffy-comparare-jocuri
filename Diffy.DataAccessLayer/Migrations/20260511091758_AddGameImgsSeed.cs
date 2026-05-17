using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Diffy.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddGameImgsSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "GameImgs",
                columns: new[] { "Id", "GameId", "ImgUrl" },
                values: new object[,]
                {
                    { 1, 1, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg" },
                    { 2, 2, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" },
                    { 3, 3, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg" },
                    { 4, 4, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg" },
                    { 5, 5, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "GameImgs",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
