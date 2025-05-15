using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Models;
using static System.Reflection.Metadata.BlobBuilder;

namespace Application.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Books>> GetAllBooksAsync();
        Task<Books> GetBookByIdAsync(int id);
        Task<int> AddBookAsync(Books book);
        Task<bool> UpdateBookAsync(Books book);
        Task<bool> DeleteBookAsync(int id);
    }
}
