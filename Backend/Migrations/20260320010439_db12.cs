using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class db12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserComments_ArchiveGames_GameArchiveId",
                table: "UserComments");

            migrationBuilder.DropIndex(
                name: "IX_UserComments_GameArchiveId",
                table: "UserComments");

            migrationBuilder.DropColumn(
                name: "GameArchiveId",
                table: "UserComments");

            migrationBuilder.DropColumn(
                name: "Modified",
                table: "ArchiveGames");

            migrationBuilder.RenameColumn(
                name: "Uploaded",
                table: "ArchiveGames",
                newName: "UploadedAt");

            migrationBuilder.RenameColumn(
                name: "ThumbnailUrl",
                table: "ArchiveGames",
                newName: "Version");

            migrationBuilder.RenameColumn(
                name: "Tags",
                table: "ArchiveGames",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "SwfUrl",
                table: "ArchiveGames",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "StarsRated",
                table: "ArchiveGames",
                newName: "RatingCount");

            migrationBuilder.AddColumn<float>(
                name: "RatingAverage",
                table: "ArchiveGames",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RatingAverage",
                table: "ArchiveGames");

            migrationBuilder.RenameColumn(
                name: "Version",
                table: "ArchiveGames",
                newName: "ThumbnailUrl");

            migrationBuilder.RenameColumn(
                name: "UploadedAt",
                table: "ArchiveGames",
                newName: "Uploaded");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "ArchiveGames",
                newName: "Tags");

            migrationBuilder.RenameColumn(
                name: "RatingCount",
                table: "ArchiveGames",
                newName: "StarsRated");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "ArchiveGames",
                newName: "SwfUrl");

            migrationBuilder.AddColumn<Guid>(
                name: "GameArchiveId",
                table: "UserComments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Modified",
                table: "ArchiveGames",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_UserComments_GameArchiveId",
                table: "UserComments",
                column: "GameArchiveId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserComments_ArchiveGames_GameArchiveId",
                table: "UserComments",
                column: "GameArchiveId",
                principalTable: "ArchiveGames",
                principalColumn: "Id");
        }
    }
}
