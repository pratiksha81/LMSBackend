using LMS.Models;
using MediatR;

namespace LMS.CQRS.Queries
{
    public class GetAllStudentsQuery : IRequest<IEnumerable<Students>> { }
}
