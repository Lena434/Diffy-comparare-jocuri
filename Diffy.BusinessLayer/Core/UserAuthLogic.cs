using Diffy.BusinessLayer.Interfaces;
using Diffy.BusinessLayer.Structure;
using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Core;

public class UserAuthLogic: UserAuthActions, IUserAuthLogic
{
    public ServiceResponse Register (UserCreateDto userCreateDto) => RegisterAction(userCreateDto);
    public ServiceResponse Login (UserLoginDto userLoginDto) => LoginAction(userLoginDto);
}