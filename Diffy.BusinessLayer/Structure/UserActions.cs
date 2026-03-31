  using Diffy.DataAccessLayer.Context;                                                                                                                                             
  using Diffy.Domain.Entities.User;                                                                                                                                                
  using Diffy.Domain.Models.User;                                                                                                                                                  
                                                                                                                                                                                   
  namespace Diffy.BusinessLayer.Structure;                                                                                                                                         
   
  public class UserActions                                                                                                                                                         
  {               
      private readonly DiffyDbContext _dbContext;

      public UserActions()
      {
          _dbContext = new DiffyDbContext();
      }                                                                                                                                                                            
   
      internal bool CreateUserAction(UserCreateDto userCreateDto)                                                                                                                              
      {           
          var userEntity = new UserEntity                                                                                                                                          
          {       
              Username = userCreateDto.Username,
              Email = userCreateDto.Email,
              PasswordHash = userCreateDto.Password,
              Role = UserRole.User,
              IsBanned = false,                                                                                                                                                    
              RegisteredOn = DateTime.UtcNow
          };                                                                                                                                                                       
                  
          try
          {
              _dbContext.Users.Add(userEntity);
              _dbContext.SaveChanges();                                                                                                                                            
              return true;
          }                                                                                                                                                                        
          catch (Exception e)
          {
              return false;
          }
      }

      internal UserInfoDto? GetUserByIdAction(int id)                                                                                                                                
      {
          var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);                                                                                                             
          if (user == null) return null;                                                                                                                                           
   
          return new UserInfoDto                                                                                                                                                   
          {       
              Id = user.Id,
              Username = user.Username,
              Email = user.Email,
              Role = user.Role,                                                                                                                                                    
              IsBanned = user.IsBanned,
              RegisteredOn = user.RegisteredOn                                                                                                                                     
          };      
      }

      internal List<UserInfoDto> GetUserListAction()                                                                                                                                 
      {
          return _dbContext.Users.Select(user => new UserInfoDto                                                                                                                   
          {       
              Id = user.Id,
              Username = user.Username,
              Email = user.Email,
              Role = user.Role,                                                                                                                                                    
              IsBanned = user.IsBanned,
              RegisteredOn = user.RegisteredOn                                                                                                                                     
          }).ToList();
      }

      internal bool UpdateUserAction(int id, UserUpdateDto dto)                                                                                                                      
      {
          var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);                                                                                                             
          if (user == null) return false;

          user.Username = dto.Username;                                                                                                                                            
          user.Email = dto.Email;
          user.Role = dto.Role;                                                                                                                                                    
          user.IsBanned = dto.IsBanned;

          try
          {
              _dbContext.SaveChanges();
              return true;                                                                                                                                                         
          }
          catch (Exception e)                                                                                                                                                      
          {       
              return false;
          }
      }

      internal bool DeleteUserAction(int id)
      {
          var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
          if (user == null) return false;                                                                                                                                          
   
          try                                                                                                                                                                      
          {       
              _dbContext.Users.Remove(user);
              _dbContext.SaveChanges();
              return true;
          }                                                                                                                                                                        
          catch (Exception e)
          {                                                                                                                                                                        
              return false;
          }
      }
      
      internal bool ChangePasswordAction(ChangePasswordDto dto)                                                                                                                          
      {                                                                                                                                                                              
          var user = _dbContext.Users.FirstOrDefault(u => u.Email == dto.Email);
          if (user == null || user.PasswordHash != dto.OldPassword) return false;

          user.PasswordHash = dto.NewPassword;
          try
          {
              _dbContext.SaveChanges();
              return true;
          }
          catch (Exception e)
          {
              return false;
          }
      }

      internal bool UpdateProfileAction(UserProfileUpdateDto dto)                                                                                                                      
      {                                                                                                                                                                                
          var user = _dbContext.Users.FirstOrDefault(u => u.Email == dto.Email);                                                                                                       
          if (user == null) return false;                                                                                                                                            

          user.Username = dto.Username;
          user.Email = dto.NewEmail;
          try
          {
              _dbContext.SaveChanges();
              return true;
          }
          catch (Exception e)
          {
              return false;
          }
      }

  }
