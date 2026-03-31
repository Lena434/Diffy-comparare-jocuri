  using Diffy.BusinessLayer.Interfaces;                                                                                                                                            
  using Diffy.BusinessLayer.Structure;                                                                                                                                             
  using Diffy.Domain.Models.User;                                                                                                                                                  
  using Diffy.Domain.Models.Service;                                                                                                                                             
                                                                                                                                                                                   
  namespace Diffy.BusinessLayer.Core;

  public class UserLogic : UserActions, IUserLogic                                                                                                                                 
  {
      public ServiceResponse CreateUser(UserCreateDto userCreateDto)                                                                                                                         
      {           
          var result = CreateUserAction(userCreateDto);
          if (!result)                                                                                                                                                             
              return new ServiceResponse { IsSuccess = false, Message = "User creation failed" };
          return new ServiceResponse { IsSuccess = true, Message = "User created successfully" };                                                                                  
      }           
                                                                                                                                                                                   
      public ServiceResponse GetUserById(int id)
      {
          var result = GetUserByIdAction(id);
          if (result == null)                                                                                                                                                      
              return new ServiceResponse { IsSuccess = false, Message = "User not found" };
          return new ServiceResponse { IsSuccess = true, Message = "User found successfully", Data = result };                                                                     
      }                                                                                                                                                                            
   
      public ServiceResponse GetUserList()                                                                                                                                         
      {           
          var users = GetUserListAction();
          return new ServiceResponse { IsSuccess = true, Data = users };
      }                                                                                                                                                                            
   
      public ServiceResponse UpdateUser(int id, UserUpdateDto dto)                                                                                                                 
      {           
          var result = UpdateUserAction(id, dto);
          if (!result)                                                                                                                                                             
              return new ServiceResponse { IsSuccess = false, Message = "User update failed" };
          return new ServiceResponse { IsSuccess = true, Message = "User updated successfully" };                                                                                  
      }           

      public ServiceResponse DeleteUser(int id)                                                                                                                                    
      {
          var result = DeleteUserAction(id);                                                                                                                                       
          if (!result)
              return new ServiceResponse { IsSuccess = false, Message = "User not found" };
          return new ServiceResponse { IsSuccess = true, Message = "User deleted successfully" };
      } 
      
      public ServiceResponse ChangePassword(ChangePasswordDto dto)
      {
          var result = ChangePasswordAction(dto);
          if (!result)
              return new ServiceResponse { IsSuccess = false, Message = "Incorrect old password." };
          return new ServiceResponse { IsSuccess = true, Message = "Password changed successfully." };
      }

      public ServiceResponse UpdateProfile(UserProfileUpdateDto userProfileUpdateDto)
      {
          var result = UpdateProfileAction(userProfileUpdateDto);                                                                                                                                
          if (!result)                                                                                                                                                               
              return new ServiceResponse { IsSuccess = false, Message = "User not found." };
          return new ServiceResponse { IsSuccess = true, Message = "Profile updated successfully." };

      }

  }
