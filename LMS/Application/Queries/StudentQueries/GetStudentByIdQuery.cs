using LMS.Models;
using MediatR;

namespace LMS.CQRS.Queries
{
    public class GetStudentByIdQuery : IRequest<Students>
    {
        public int Id { get; set; }

        public GetStudentByIdQuery(int id)
        {
            Id = id;
        }
    }
}
