use Library
Create PROCEDURE sp_UserOperations
    @Flag CHAR(1), -- 'S' for Sign-Up, 'L' for Login
    @Username NVARCHAR(50),
    @Password NVARCHAR(255) = NULL, -- Optional for Login
	@Email NVARCHAR(255) = NULL,
    @Role NVARCHAR(50) = NULL -- Optional for Login
AS
BEGIN
    -- Check the flag to determine the operation
    IF @Flag = 'S'
    BEGIN
        -- Sign-Up logic
        INSERT INTO Users (Username, Password, Email, Role)
        VALUES (@Username, @Password, @Email, @Role);
    END
    ELSE IF @Flag = 'L'
    BEGIN
        -- Login logic
        SELECT * FROM Users WHERE Username = @Username;
    END
    ELSE
    BEGIN
        -- Invalid flag
        THROW 50001, 'Invalid operation flag. Use ''S'' for Sign-Up or ''L'' for Login.', 1;
    END
END;
select * from Users;