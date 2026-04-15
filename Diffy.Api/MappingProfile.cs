using AutoMapper;
using Diffy.Domain.Entities;
using Diffy.Domain.Entities.Game;
using Diffy.Domain.Entities.User;
using Diffy.Domain.Models.Genre;
using Diffy.Domain.Models.Platform;
using Diffy.Domain.Models.GameMode;
using Diffy.Domain.Models.Game;
using Diffy.Domain.Models.Favorite;
using Diffy.Domain.Models.Rating;
using Diffy.Domain.Models.User;

namespace Diffy.Api;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<GenreEntity, GenreDto>().ReverseMap();
        CreateMap<PlatformEntity, PlatformDto>().ReverseMap();
        CreateMap<GameModeEntity, GameModeDto>().ReverseMap();

        CreateMap<GameEntity, GameInfoDto>()
            .ForMember(dest => dest.Genres,
                opt => opt.MapFrom(src => src.GameGenres.Select(gg => gg.Genre.Name).ToList()))
            .ForMember(dest => dest.Platforms,
                opt => opt.MapFrom(src => src.GamePlatforms.Select(gp => gp.Platform.Name).ToList()))
            .ForMember(dest => dest.GameModes,
                opt => opt.MapFrom(src => src.GameModes.Select(gm => gm.GameMode.Name).ToList()))
            .ForMember(dest => dest.AverageRating,
                opt => opt.MapFrom(src => src.Ratings.Any() ? (decimal)src.Ratings.Average(r => r.Score) : 0m));

        CreateMap<GameCreateDto, GameEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.GameGenres, opt => opt.Ignore())
            .ForMember(dest => dest.GamePlatforms, opt => opt.Ignore())
            .ForMember(dest => dest.GameModes, opt => opt.Ignore())
            .ForMember(dest => dest.Ratings, opt => opt.Ignore());

        CreateMap<GameUpdateDto, GameEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.GameGenres, opt => opt.Ignore())
            .ForMember(dest => dest.GamePlatforms, opt => opt.Ignore())
            .ForMember(dest => dest.GameModes, opt => opt.Ignore())
            .ForMember(dest => dest.Ratings, opt => opt.Ignore());

        CreateMap<UserFavoriteEntity, FavoriteDto>()
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Game.Title))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Game.ImageUrl));

        CreateMap<GameRatingEntity, GameRatingDto>();

        CreateMap<UserProfileEntity, UserProfileDto>().ReverseMap();
    }
}
