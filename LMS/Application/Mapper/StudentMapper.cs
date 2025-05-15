using Application.Handlers.StudentHandlers;
using LMS.CQRS.Commands;
using LMS.Models;

namespace LibraryManagementSystem.Mapper
{
    public static class StudentMapper
    {
        public static Students MapToModel(AddStudentCommand command)
        {
            return new Students
            {
                Name = command.Name,
                Email = command.Email,
                ContactNumber = command.ContactNumber,
                Department = command.Department
            };
        }
    }
}
