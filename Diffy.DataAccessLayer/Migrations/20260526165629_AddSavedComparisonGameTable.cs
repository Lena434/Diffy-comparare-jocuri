using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Diffy.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddSavedComparisonGameTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GameIds",
                table: "SavedComparisons");

            migrationBuilder.DropColumn(
                name: "GameTitles",
                table: "SavedComparisons");

            migrationBuilder.CreateTable(
                name: "SavedComparisonGames",
                columns: table => new
                {
                    SavedComparisonId = table.Column<int>(type: "integer", nullable: false),
                    GameId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedComparisonGames", x => new { x.SavedComparisonId, x.GameId });
                    table.ForeignKey(
                        name: "FK_SavedComparisonGames_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SavedComparisonGames_SavedComparisons_SavedComparisonId",
                        column: x => x.SavedComparisonId,
                        principalTable: "SavedComparisons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedComparisonGames_GameId",
                table: "SavedComparisonGames",
                column: "GameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedComparisonGames");

            migrationBuilder.AddColumn<string>(
                name: "GameIds",
                table: "SavedComparisons",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GameTitles",
                table: "SavedComparisons",
                type: "text",
                nullable: true);
        }
    }
}
