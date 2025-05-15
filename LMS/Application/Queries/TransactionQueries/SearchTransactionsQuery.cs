using LMS.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.TransactionQueries
{
    public class SearchTransactionsQuery : IRequest<IEnumerable<Transactions>>
    {
        public string Search { get; }

        public SearchTransactionsQuery(string search)
        {
            Search = search;
        }
    }
}
