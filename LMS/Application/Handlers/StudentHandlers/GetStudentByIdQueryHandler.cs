﻿using LMS.CQRS.Queries;
using LMS.Models;
using LMS.Repositories;
using MediatR;

namespace Application.Handlers.StudentHandlers
{
    public class GetStudentByIdQueryHandler : IRequestHandler<GetStudentByIdQuery, Students>
    {
        private readonly IStudentRepository _studentRepository;

        public GetStudentByIdQueryHandler(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<Students> Handle(GetStudentByIdQuery request, CancellationToken cancellationToken)
        {
            return await _studentRepository.GetStudentByIdAsync(request.Id);
        }
    }
}
