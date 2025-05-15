using Application.Queries.TransactionQueries;
using Infrastructure.Repositories;
using LMS.Models;
using MediatR;
using System.Transactions;

namespace Application.Handlers.TransactionHandlers
{
    public class GetAllTransactionsHandler : IRequestHandler<GetAllTransactionsQuery, IEnumerable<Transactions>>
    {
        private readonly ITransactionRepository _repository;

        public GetAllTransactionsHandler(ITransactionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Transactions>> Handle(GetAllTransactionsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAllTransactionsAsync();
        }
    }
}
