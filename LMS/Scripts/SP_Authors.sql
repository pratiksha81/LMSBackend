use Library
select * from Authors
Create PROCEDURE SP_Authors
    @Flag NVARCHAR(2),
    @AuthorID INT = NULL,
    @Name NVARCHAR(100) = NULL,
    @Bio NVARCHAR(MAX) = NULL
AS
BEGIN
    IF @Flag = 'SE'
    BEGIN
        IF @AuthorID IS NULL
            SELECT * FROM Authors order by AuthorId Desc
        ELSE
            SELECT * FROM Authors WHERE AuthorID = @AuthorID
			
    END
    ELSE IF @Flag = 'I'
    BEGIN
        INSERT INTO Authors (Name, Bio)
        VALUES (@Name, @Bio)
        SELECT SCOPE_IDENTITY()
    END
    ELSE IF @Flag = 'U'
    BEGIN
        UPDATE Authors
        SET Name = @Name,
            Bio = @Bio
        WHERE AuthorID = @AuthorID
    END
    ELSE IF @Flag = 'D'
    BEGIN
        DELETE FROM Authors WHERE AuthorID = @AuthorID
    END
END

