﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.Command.BookCommand;
using Infrastructure.Repositories;
using LMS.Models;
using MediatR;
using static System.Reflection.Metadata.BlobBuilder;

namespace Application.Handlers.BookHandlers
{
    public class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommand, bool>
    {
        private readonly IBookRepository _bookRepository;

        public UpdateBookCommandHandler(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<bool> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            var book = new Books
            {
                BookId = request.BookId,
                Title = request.Title,
                AuthorId = request.AuthorId,
                Genre = request.Genre,
                ISBN = request.ISBN,
                Quantity = request.Quantity
            };

            return await _bookRepository.UpdateBookAsync(book);
        }
    }

}
