using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace poorManReddit.Migrations
{
    /// <inheritdoc />
    public partial class SearchTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Search_tag",
                table: "Topics",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Search_tag",
                table: "Topics");
        }
    }
}
