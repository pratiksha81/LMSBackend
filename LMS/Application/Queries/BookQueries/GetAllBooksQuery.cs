using LMS.Models;
using MediatR;
using static System.Reflection.Metadata.BlobBuilder;

namespace Application.Queries.BookQueries
{
    public class GetAllBooksQuery : IRequest<IEnumerable<Books>>
    {
    }

}
