
using Application.Queries.BookQueries;
using Infrastructure.Repositories;
using LMS.Models;
using MediatR;
using static System.Reflection.Metadata.BlobBuilder;

namespace Application.Handlers.BookHandlers
{
    public class GetBookByIdQueryHandler : IRequestHandler<GetBookByIdQuery, Books>
    {
        private readonly IBookRepository _bookRepository;

        public GetBookByIdQueryHandler(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<Books> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
        {
            return await _bookRepository.GetBookByIdAsync(request.BookId);
        }
    }

}
