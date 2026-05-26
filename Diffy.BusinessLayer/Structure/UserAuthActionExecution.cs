using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Structure;

public class UserAuthActionExecution : UserAuthActions, IUserAuthAction
{
    public Task<ServiceResponse> Register(UserCreateDto userCreateDto) => RegisterActionExecution(userCreateDto);
    public Task<ServiceResponse> Login(UserLoginDto userLoginDto) => LoginActionExecution(userLoginDto);
}