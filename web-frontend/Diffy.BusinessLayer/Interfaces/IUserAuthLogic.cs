using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserAuthLogic
{
    ServiceResponse Register (UserCreateDto userCreateDto);
    ServiceResponse Login (UserLoginDto userLoginDto);
}