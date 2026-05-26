using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Interfaces;

public interface IUserAction
{
    Task<ServiceResponse> CreateUser(UserCreateDto userCreateDto);
    Task<ServiceResponse> GetUserById(int id);
    Task<ServiceResponse> GetUserList();
    Task<ServiceResponse> UpdateUser(int id, UserUpdateDto dto);
    Task<ServiceResponse> DeleteUser(int id);
    Task<ServiceResponse> ChangePassword(int userId, ChangePasswordDto changePasswordDto);
    Task<ServiceResponse> UpdateProfile(int userId, UserProfileUpdateDto userProfileUpdateDto);
}