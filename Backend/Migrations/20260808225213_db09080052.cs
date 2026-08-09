using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class db09080052 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Badges");

            migrationBuilder.CreateTable(
                name: "BadgeModeration",
                columns: table => new
                {
                    BadgeId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Result = table.Column<int>(type: "INTEGER", nullable: false),
                    Reason = table.Column<string>(type: "TEXT", nullable: true),
                    ModeratedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModeratorId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BadgeModeration", x => x.BadgeId);
                    table.ForeignKey(
                        name: "FK_BadgeModeration_AspNetUsers_ModeratorId",
                        column: x => x.ModeratorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BadgeModeration_Badges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "Badges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BadgeModeration_ModeratorId",
                table: "BadgeModeration",
                column: "ModeratorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BadgeModeration");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Badges",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
