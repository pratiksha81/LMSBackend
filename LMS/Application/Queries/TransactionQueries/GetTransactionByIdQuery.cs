using LMS.Models;
using MediatR;
using System.Transactions;

namespace Application.Queries.TransactionQueries
{
    public class GetTransactionByIdQuery : IRequest<Transactions>
    {
        public int TransactionId { get; }

        public GetTransactionByIdQuery(int transactionId)
        {
            TransactionId = transactionId;
        }
    }
}
