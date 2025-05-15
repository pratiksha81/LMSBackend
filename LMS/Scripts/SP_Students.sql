use Library
Alter PROCEDURE SP_Students
    @Flag NVARCHAR(10),
    @StudentId INT = NULL,
    @Name NVARCHAR(255) = NULL,
    @Email NVARCHAR(255) = NULL,
    @ContactNumber NVARCHAR(15) = NULL,
    @Department NVARCHAR(100) = NULL
AS
BEGIN
    IF @Flag = 'SE'
    BEGIN
        IF @StudentId IS NULL
        BEGIN
            SELECT * FROM Students order by StudentId desc; -- Fetch all students
        END
        ELSE
        BEGIN
            SELECT * FROM Students WHERE StudentId = @StudentId; -- Fetch student by ID
        END
    END

    ELSE IF @Flag = 'I'
    BEGIN
        INSERT INTO Students (Name, Email, ContactNumber, Department)
        VALUES (@Name, @Email, @ContactNumber, @Department);

        SELECT SCOPE_IDENTITY() AS StudentId; -- Return the ID of the newly added student
    END

    ELSE IF @Flag = 'U'
    BEGIN
        UPDATE Students
        SET Name = @Name, Email = @Email, ContactNumber = @ContactNumber, Department = @Department
        WHERE StudentId = @StudentId;

        SELECT 'Student updated successfully.' AS Msg;
    END

    ELSE IF @Flag = 'D'
    BEGIN
        DELETE FROM Students WHERE StudentId = @StudentId;

        SELECT 'Student deleted successfully.' AS Msg;
    END
END
 select * from Students;