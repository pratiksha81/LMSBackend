using LMS.Models;
using MediatR;

namespace Application.Queries.AuthorQueries
{
    public class GetAuthorByIdQuery : IRequest<Authors>
    {
        public int AuthorId { get; set; }

        public GetAuthorByIdQuery(int authorId)
        {
            AuthorId = authorId;
        }
    }
}
