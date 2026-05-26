using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserAuthAction
{
    Task<ServiceResponse> Register(UserCreateDto userCreateDto);
    Task<ServiceResponse> Login(UserLoginDto userLoginDto);
}