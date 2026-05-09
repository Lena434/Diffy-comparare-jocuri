using AutoMapper;
using Diffy.Domain.Entities;
using Diffy.Domain.Entities.Game;
using Diffy.Domain.Models.Game;
using Diffy.Domain.Models.Genre;
using Diffy.Domain.Models.GameMode;
using Diffy.Domain.Models.Platform;
using Diffy.Domain.Models.Rating;
using Diffy.Domain.Models.User;

namespace Diffy.Api.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Game
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

        CreateMap<GameEntity, GameInfoDto>()
            .ForMember(dest => dest.Genres,
                opt => opt.MapFrom(src => src.GameGenres.Select(gg => gg.Genre.Name).ToList()))
            .ForMember(dest => dest.Platforms,
                opt => opt.MapFrom(src => src.GamePlatforms.Select(gp => gp.Platform.Name).ToList()))
            .ForMember(dest => dest.GameModes,
                opt => opt.MapFrom(src => src.GameModes.Select(gm => gm.GameMode.Name).ToList()))
            .ForMember(dest => dest.AverageRating,
                opt => opt.MapFrom(src => src.Ratings.Any()
                    ? (decimal)src.Ratings.Average(r => (double)r.Score)
                    : 0m));

        // Genre
        CreateMap<GenreEntity, GenreDto>();
        CreateMap<GenreDto, GenreEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.GameGenres, opt => opt.Ignore());

        // Platform
        CreateMap<PlatformEntity, PlatformDto>();
        CreateMap<PlatformDto, PlatformEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.GamePlatforms, opt => opt.Ignore());

        // GameMode
        CreateMap<GameModeEntity, GameModeDto>();
        CreateMap<GameModeDto, GameModeEntity>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());

        // Rating
        CreateMap<GameRatingEntity, GameRatingDto>();

        // User
        CreateMap<Domain.Entities.User.UserEntity, UserInfoDto>();
    }
}
