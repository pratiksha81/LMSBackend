using Dapper;
using Domain.Entities.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly string _connectionString;

        public DashboardRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<DashBoard> GetDashboardDataAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Flag", "GetDashboardData");

                var dashboard = await connection.QueryFirstOrDefaultAsync<DashBoard>(
                    "usp_GetDashboardData",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                return dashboard;
            }
        }

        public async Task<IEnumerable<OverdueBorrower>> GetOverdueBorrowersAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Flag", "GetOverdueBorrowers");

                return await connection.QueryAsync<OverdueBorrower>(
                    "usp_GetDashboardData",
                    parameters,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}