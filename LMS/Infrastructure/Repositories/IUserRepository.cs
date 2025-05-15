using LMS.Models;
using System.Threading.Tasks;

namespace LMS.Repositories
{
    public interface IUserRepository
    {
        Task AddUserAsync(Users user);
        Task<Users> GetUserByUsernameAsync(string username);
    }
}
