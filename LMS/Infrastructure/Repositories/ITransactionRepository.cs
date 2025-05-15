using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Models;

namespace Infrastructure.Repositories
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transactions>> GetAllTransactionsAsync();
        Task<Transactions> GetTransactionByIdAsync(int id);
        Task<IEnumerable<Transactions>> SearchTransactionsAsync(string search = "");
        Task<int> AddTransactionAsync(Transactions transaction);
        Task<bool> UpdateTransactionAsync(Transactions transaction);
        Task<bool> DeleteTransactionAsync(int id);
    }
}
