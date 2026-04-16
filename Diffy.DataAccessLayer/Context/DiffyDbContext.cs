using Microsoft.EntityFrameworkCore;
using Diffy.Domain.Entities;
using Diffy.Domain.Entities.Game;
using Diffy.Domain.Entities.User;
using Diffy.DataAccessLayer;



namespace Diffy.DataAccessLayer.Context;

public class DiffyDbContext : DbContext
{
    public DiffyDbContext() { }
    public DiffyDbContext(DbContextOptions<DiffyDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured && !string.IsNullOrEmpty(DbConfig.ConnectionString))
            optionsBuilder.UseNpgsql(DbConfig.ConnectionString);
    }

    public DbSet<GameEntity> Games { get; set; }
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<GenreEntity> Genres { get; set; }
    public DbSet<PlatformEntity> Platforms { get; set; }
    public DbSet<GameModeEntity> GameModes { get; set; }
    public DbSet<GameGenreEntity> GameGenres { get; set; }
    public DbSet<GamePlatformEntity> GamePlatforms { get; set; }
    public DbSet<GameGameModeEntity> GameGameModes { get; set; }
    public DbSet<UserProfileEntity> UserProfiles { get; set; }
    public DbSet<UserFavoriteEntity> UserFavorites { get; set; }
    public DbSet<GameRatingEntity> GameRatings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameGenreEntity>()
            .HasKey(gg => new { gg.GameId, gg.GenreId });
        modelBuilder.Entity<GameGenreEntity>()
            .HasOne(gg => gg.Game).WithMany(g => g.GameGenres).HasForeignKey(gg => gg.GameId);
        modelBuilder.Entity<GameGenreEntity>()
            .HasOne(gg => gg.Genre).WithMany(g => g.GameGenres).HasForeignKey(gg => gg.GenreId);

        modelBuilder.Entity<GamePlatformEntity>()
            .HasKey(gp => new { gp.GameId, gp.PlatformId });
        modelBuilder.Entity<GamePlatformEntity>()
            .HasOne(gp => gp.Game).WithMany(g => g.GamePlatforms).HasForeignKey(gp => gp.GameId);
        modelBuilder.Entity<GamePlatformEntity>()
            .HasOne(gp => gp.Platform).WithMany(p => p.GamePlatforms).HasForeignKey(gp => gp.PlatformId);

        modelBuilder.Entity<GameGameModeEntity>()
            .HasKey(gm => new { gm.GameId, gm.GameModeId });
        modelBuilder.Entity<GameGameModeEntity>()
            .HasOne(gm => gm.Game).WithMany(g => g.GameModes).HasForeignKey(gm => gm.GameId);
        modelBuilder.Entity<GameGameModeEntity>()
            .HasOne(gm => gm.GameMode).WithMany().HasForeignKey(gm => gm.GameModeId);

        modelBuilder.Entity<UserProfileEntity>()
            .HasKey(p => p.UserId);
        modelBuilder.Entity<UserProfileEntity>()
            .HasOne(p => p.User)
            .WithOne(u => u.UserProfile)
            .HasForeignKey<UserProfileEntity>(p => p.UserId);

        modelBuilder.Entity<UserFavoriteEntity>()
            .HasKey(uf => new { uf.UserId, uf.GameId });
        modelBuilder.Entity<UserFavoriteEntity>()
            .HasOne(uf => uf.User).WithMany().HasForeignKey(uf => uf.UserId);
        modelBuilder.Entity<UserFavoriteEntity>()
            .HasOne(uf => uf.Game).WithMany().HasForeignKey(uf => uf.GameId);

        modelBuilder.Entity<GameRatingEntity>()
            .HasKey(gr => new { gr.UserId, gr.GameId });
        modelBuilder.Entity<GameRatingEntity>()
            .HasOne(gr => gr.User).WithMany().HasForeignKey(gr => gr.UserId);
        modelBuilder.Entity<GameRatingEntity>()
            .HasOne(gr => gr.Game).WithMany(g => g.Ratings).HasForeignKey(gr => gr.GameId);
    }
}