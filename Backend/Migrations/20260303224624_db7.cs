using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class db7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBadge_UserProfiles_UserProfileId",
                table: "UserBadge");

            migrationBuilder.DropForeignKey(
                name: "FK_UserComments_UserProfiles_UserProfileId",
                table: "UserComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserProfiles");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "UserComments",
                newName: "UserProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserComments_UserProfileId",
                table: "UserComments",
                newName: "IX_UserComments_UserProfileUserId");

            migrationBuilder.RenameColumn(
                name: "UserProfileId",
                table: "UserBadge",
                newName: "UserProfileUserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserBadge_UserProfileId",
                table: "UserBadge",
                newName: "IX_UserBadge_UserProfileUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBadge_UserProfiles_UserProfileUserId",
                table: "UserBadge",
                column: "UserProfileUserId",
                principalTable: "UserProfiles",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserComments_UserProfiles_UserProfileUserId",
                table: "UserComments",
                column: "UserProfileUserId",
                principalTable: "UserProfiles",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBadge_UserProfiles_UserProfileUserId",
                table: "UserBadge");

            migrationBuilder.DropForeignKey(
                name: "FK_UserComments_UserProfiles_UserProfileUserId",
                table: "UserComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles");

            migrationBuilder.RenameColumn(
                name: "UserProfileUserId",
                table: "UserComments",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_UserComments_UserProfileUserId",
                table: "UserComments",
                newName: "IX_UserComments_UserProfileId");

            migrationBuilder.RenameColumn(
                name: "UserProfileUserId",
                table: "UserBadge",
                newName: "UserProfileId");

            migrationBuilder.RenameIndex(
                name: "IX_UserBadge_UserProfileUserId",
                table: "UserBadge",
                newName: "IX_UserBadge_UserProfileId");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "UserProfiles",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProfiles",
                table: "UserProfiles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBadge_UserProfiles_UserProfileId",
                table: "UserBadge",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserComments_UserProfiles_UserProfileId",
                table: "UserComments",
                column: "UserProfileId",
                principalTable: "UserProfiles",
                principalColumn: "Id");
        }
    }
}
