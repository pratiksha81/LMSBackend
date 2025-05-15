using LMS.CQRS.Commands;
using LMS.Models;
using LMS.Repositories;
using MediatR;

namespace Application.Handlers.StudentHandlers
{
    public class AddStudentCommandHandler : IRequestHandler<AddStudentCommand, int>
    {
        private readonly IStudentRepository _studentRepository;

        public AddStudentCommandHandler(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<int> Handle(AddStudentCommand request, CancellationToken cancellationToken)
        {
            var student = new Students
            {
                Name = request.Name,
                Email = request.Email,
                ContactNumber = request.ContactNumber,
                Department = request.Department
            };

            return await _studentRepository.AddStudentAsync(student);
        }
    }
}
