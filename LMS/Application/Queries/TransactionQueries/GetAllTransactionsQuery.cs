using LMS.Models;
using MediatR;
using System.Transactions;

namespace Application.Queries.TransactionQueries
{
    public class GetAllTransactionsQuery : IRequest<IEnumerable<Transactions>> { }
}
