using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace poorManReddit.Migrations
{
    /// <inheritdoc />
    public partial class DataModelUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title_id",
                table: "Comments",
                newName: "Topic_id");

            migrationBuilder.AddColumn<int>(
                name: "Topic_id",
                table: "Topics",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Comment_id",
                table: "Comments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic_id",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "Comment_id",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "Topic_id",
                table: "Comments",
                newName: "Title_id");
        }
    }
}
