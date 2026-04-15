namespace Diffy.Domain.Entities;

public class GenreEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Game.GameGenreEntity> GameGenres { get; set; } = new List<Game.GameGenreEntity>();
}