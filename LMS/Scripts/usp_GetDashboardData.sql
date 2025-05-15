use Library


-- Stored Procedure: usp_GetDashboardData
CREATE PROCEDURE usp_GetDashboardData
    @Flag NVARCHAR(50)
AS
BEGIN
    -- Declare variables to store results for Dashboard
    IF @Flag = 'GetDashboardData'
    BEGIN
        SELECT 
            (SELECT COUNT(*) FROM Students) AS TotalStudents,      -- Total number of students
            (SELECT COUNT(*) FROM Books) AS TotalBook,             -- Total number of books
            (SELECT COUNT(*) FROM Transactions) AS TotalTransaction, -- Total transactions
            (SELECT COUNT(*) FROM Transactions WHERE TransactionType = 'Borrow') AS TotalBooksBorrowed, -- Total books borrowed
            (SELECT COUNT(*) FROM Transactions WHERE TransactionType = 'Return') AS TotalBooksReturned; -- Total books returned
    END

    -- Get overdue borrowers
    IF @Flag = 'GetOverdueBorrowers'
    BEGIN
        SELECT 
            S.Name AS Name,
            T.TransactionId AS BorrowedId
        FROM Transactions T
        INNER JOIN Students S ON T.StudentId = S.StudentId
        WHERE 
            T.TransactionType = 'Borrow' AND
            DATEDIFF(DAY, T.Date, GETDATE()) > 30; -- Overdue if borrowed over 30 days ago
    END
END
