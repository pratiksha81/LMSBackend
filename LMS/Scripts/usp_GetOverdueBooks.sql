use Library




Create PROCEDURE usp_GetOverdueBooks
AS
BEGIN
    SET NOCOUNT ON;
 
    SELECT 
        S.StudentId AS StudentId,   -- Matches `EmailData.StudentId`
        S.Name AS Name,             -- Matches `EmailData.Name`
        S.Email AS Email,           -- Matches `EmailData.Email`
        B.Title AS BookTitle        -- Matches `EmailData.BookTitle`
    FROM 
        Transactions T
    INNER JOIN 
        Students S ON T.StudentId = S.StudentId
    INNER JOIN 
        Books B ON T.BookId = B.BookId
    WHERE 
        T.TransactionType = 'Borrow' -- Filter for borrow transactions
        AND NOT EXISTS (
            SELECT 1 
            FROM Transactions T2 
            WHERE 
                T2.TransactionType = 'Return' 
                AND T2.BookId = T.BookId
                AND T2.StudentId = T.StudentId
                AND T2.Date > T.Date -- Return occurred after this borrow
        )
        AND DATEDIFF(DAY, T.Date, GETDATE()) > 30; -- Overdue if borrowed over 30 days ago
END;
 
EXEC usp_GetOverdueBooks;