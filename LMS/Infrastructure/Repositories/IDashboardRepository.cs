using Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public interface IDashboardRepository
    {

        Task<DashBoard> GetDashboardDataAsync();

        Task<IEnumerable<OverdueBorrower>> GetOverdueBorrowersAsync();
    }
}