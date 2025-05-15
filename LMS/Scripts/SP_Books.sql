use Library
Create PROCEDURE SP_Books
    @Flag NVARCHAR(2),
    @BookId INT = NULL,
    @Title NVARCHAR(100) = NULL,
    @AuthorId INT = NULL,
    @Genre NVARCHAR(50) = NULL,
    @ISBN NVARCHAR(20) = NULL,
    @Quantity INT = NULL
AS
BEGIN
    IF @Flag = 'SE'
    BEGIN
        IF @BookId IS NULL
            SELECT * FROM Books order by BookId desc;
        ELSE
            SELECT * FROM Books WHERE BookId = @BookId
    END
    ELSE IF @Flag = 'I'
    BEGIN
        INSERT INTO Books (Title, AuthorId, Genre, ISBN, Quantity)
        VALUES (@Title, @AuthorId, @Genre, @ISBN, @Quantity)
        SELECT SCOPE_IDENTITY()
    END
    ELSE IF @Flag = 'U'
    BEGIN
        UPDATE Books
        SET Title = @Title,
            AuthorId = @AuthorId,
            Genre = @Genre,
            ISBN = @ISBN,
            Quantity = @Quantity
        WHERE BookId = @BookId
    END
    ELSE IF @Flag = 'D'
    BEGIN
        DELETE FROM Books WHERE BookId = @BookId
    END
END
select * from Books