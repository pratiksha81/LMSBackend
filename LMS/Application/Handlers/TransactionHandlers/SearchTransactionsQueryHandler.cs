using Application.Queries.TransactionQueries;
using Infrastructure.Repositories;
using LMS.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.TransactionHandlers
{
    public class SearchTransactionsQueryHandler : IRequestHandler<SearchTransactionsQuery, IEnumerable<Transactions>>
    {
        private readonly ITransactionRepository _transactionRepository;

        public SearchTransactionsQueryHandler(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<IEnumerable<Transactions>> Handle(SearchTransactionsQuery request, CancellationToken cancellationToken)
        {
            return await _transactionRepository.SearchTransactionsAsync(request.Search);
        }
    }
}
