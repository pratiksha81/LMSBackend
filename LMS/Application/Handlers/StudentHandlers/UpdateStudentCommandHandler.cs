using LMS.Models;
using LMS.Repositories;
using MediatR;

namespace Application.Handlers.StudentHandlers
{
    public class UpdateStudentCommandHandler : IRequestHandler<UpdateStudentCommand, bool>
    {
        private readonly IStudentRepository _studentRepository;

        public UpdateStudentCommandHandler(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<bool> Handle(UpdateStudentCommand request, CancellationToken cancellationToken)
        {
            var student = new Students
            {
                StudentId = request.StudentId,
                Name = request.Name,
                Email = request.Email,
                ContactNumber = request.ContactNumber,
                Department = request.Department
            };

            return await _studentRepository.UpdateStudentAsync(student);
        }
    }
}
