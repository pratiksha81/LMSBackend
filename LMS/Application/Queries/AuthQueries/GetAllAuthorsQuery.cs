using LMS.Models;
using MediatR;

namespace Application.Queries.AuthorQueries
{
    public class GetAllAuthorsQuery : IRequest<IEnumerable<Authors>>
    {
    }

}
