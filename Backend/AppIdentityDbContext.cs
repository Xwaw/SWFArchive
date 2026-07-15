using Backend.Models;
using Backend.Models.Dto;
using Backend.Models.Game;
using Backend.Models.User;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public class AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : IdentityDbContext<User>(options)
{
    public DbSet<GameArchive> ArchiveGames { get; set; }
    public DbSet<FileTarget> Files { get; set; }
    public DbSet<UserGame> UserGames { get; set; }
    public DbSet<UserComment> UserComments { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Tag> Tags { get; set; }
    
    public DbSet<Friendship> FriendShips {get; set;}
    
    public DbSet<SessionRoom> SessionRooms { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder); 

        builder.Entity<UserGame>()
            .HasOne(ug => ug.User)
            .WithMany(u => u.UserGames)
            .HasForeignKey(ug => ug.UserId);

        builder.Entity<UserGame>()
            .HasOne(ug => ug.Game)
            .WithMany(g => g.UserGames)
            .HasForeignKey(ug => ug.GameId);

        builder.Entity<UserGame>()
            .HasIndex(ug => new { ug.UserId, ug.GameId })
            .IsUnique();
        
        builder.Entity<User>()
            .HasOne(u => u.UserProfile)
            .WithOne(p => p.User)
            .HasForeignKey<UserProfile>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<UserProfile>()
            .HasIndex(p => p.UserId)
            .IsUnique();
        
        
        builder.Entity<GameTag>()
            .HasKey(gt => new { gt.GameArchiveId, gt.TagId });

        builder.Entity<GameTag>()
            .HasOne(gt => gt.GameArchive)
            .WithMany(g => g.GameTags)
            .HasForeignKey(gt => gt.GameArchiveId);

        builder.Entity<GameTag>()
            .HasOne(gt => gt.Tag)
            .WithMany(t => t.GameTag)
            .HasForeignKey(gt => gt.TagId);
        
        
        builder.Entity<FriendRequest>()
            .HasOne(fr => fr.Sender)
            .WithMany(u => u.SentFriendRequests)
            .HasForeignKey(fr => fr.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<FriendRequest>()
            .HasOne(fr => fr.Receiver)
            .WithMany(u => u.ReceivedFriendRequests)
            .HasForeignKey(fr => fr.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
    