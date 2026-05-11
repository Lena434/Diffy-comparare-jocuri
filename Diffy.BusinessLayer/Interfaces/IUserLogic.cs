using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserLogic
{
    ServiceResponse CreateUser(UserCreateDto userCreateDto);
    ServiceResponse GetUserById(int id);
    ServiceResponse GetUserList();
    ServiceResponse UpdateUser(int id, UserUpdateDto dto);
    ServiceResponse DeleteUser(int id);
    ServiceResponse ChangePassword(int userId, ChangePasswordDto changePasswordDto);
    ServiceResponse UpdateProfile(int userId, UserProfileUpdateDto userProfileUpdateDto);
}