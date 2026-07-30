using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class db27072005 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Friendships_FriendshipId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "FriendshipId",
                table: "Messages",
                newName: "ConversationId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_FriendshipId",
                table: "Messages",
                newName: "IX_Messages_ConversationId");

            migrationBuilder.AddColumn<Guid>(
                name: "ConversationId",
                table: "Friendships",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_ConversationId",
                table: "Friendships",
                column: "ConversationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friendships_Conversations_ConversationId",
                table: "Friendships",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Conversations_ConversationId",
                table: "Messages",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendships_Conversations_ConversationId",
                table: "Friendships");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Conversations_ConversationId",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Friendships_ConversationId",
                table: "Friendships");

            migrationBuilder.DropColumn(
                name: "ConversationId",
                table: "Friendships");

            migrationBuilder.RenameColumn(
                name: "ConversationId",
                table: "Messages",
                newName: "FriendshipId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_ConversationId",
                table: "Messages",
                newName: "IX_Messages_FriendshipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Friendships_FriendshipId",
                table: "Messages",
                column: "FriendshipId",
                principalTable: "Friendships",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
