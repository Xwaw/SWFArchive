using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBadgesss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBadges_UserProfiles_UserProfileUserId",
                table: "UserBadges");

            migrationBuilder.DropIndex(
                name: "IX_UserBadges_UserProfileUserId",
                table: "UserBadges");

            migrationBuilder.DropColumn(
                name: "UserProfileUserId",
                table: "UserBadges");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBadges_UserProfiles_UserId",
                table: "UserBadges",
                column: "UserId",
                principalTable: "UserProfiles",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBadges_UserProfiles_UserId",
                table: "UserBadges");

            migrationBuilder.AddColumn<string>(
                name: "UserProfileUserId",
                table: "UserBadges",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_UserBadges_UserProfileUserId",
                table: "UserBadges",
                column: "UserProfileUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBadges_UserProfiles_UserProfileUserId",
                table: "UserBadges",
                column: "UserProfileUserId",
                principalTable: "UserProfiles",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
