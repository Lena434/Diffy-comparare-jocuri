using Diffy.BusinessLayer.Core;
using Diffy.BusinessLayer.Interfaces;
using Diffy.Domain.Models.Service;
using Diffy.Domain.Models.User;

namespace Diffy.BusinessLayer.Structure;

public class UserActionExecution : UserActions, IUserAction
{
    public Task<ServiceResponse> CreateUser(UserCreateDto userCreateDto) => CreateUserActionExecution(userCreateDto);
    public Task<ServiceResponse> GetUserById(int id) => GetUserByIdActionExecution(id);
    public Task<ServiceResponse> GetUserList() => GetUserListActionExecution();
    public Task<ServiceResponse> UpdateUser(int id, UserUpdateDto dto) => UpdateUserActionExecution(id, dto);
    public Task<ServiceResponse> DeleteUser(int id) => DeleteUserActionExecution(id);
    public Task<ServiceResponse> ChangePassword(int userId, ChangePasswordDto changePasswordDto) => ChangePasswordActionExecution(userId, changePasswordDto);
    public Task<ServiceResponse> UpdateProfile(int userId, UserProfileUpdateDto userProfileUpdateDto) => UpdateProfileActionExecution(userId, userProfileUpdateDto);
}