create database Library

CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),    -- Unique identifier for each librarian
    Username VARCHAR(100) NOT NULL,         -- Name used for login and identification
    Password VARCHAR(255) NOT NULL,         -- Encrypted password for authentication
    Email VARCHAR(255) NOT NULL UNIQUE,     -- Librarian's email address
    Role NVARCHAR(10) NOT NULL DEFAULT 'Admin' -- Defines role as a system administrator
);


CREATE TABLE Students (
    StudentId INT PRIMARY KEY IDENTITY(1,1), -- Auto-increment primary key
    Name VARCHAR(255) NOT NULL,             -- Full name of the student
    Email VARCHAR(255) NOT NULL UNIQUE,     -- Unique email address
    ContactNumber VARCHAR(15) NOT NULL,     -- Contact number
    Department VARCHAR(100)                 -- Optional department (NULL is allowed)
);

CREATE TABLE Authors (
    AuthorId INT PRIMARY KEY IDENTITY(1,1), -- Auto-increment primary key
    Name VARCHAR(255) NOT NULL             -- Name of the author
);




CREATE TABLE Books (
    BookId INT PRIMARY KEY IDENTITY(1,1),    -- Auto-increment primary key
    Title VARCHAR(255) NOT NULL,            -- Title of the book
    AuthorId INT,                           -- Foreign Key referencing Authors table
    Genre VARCHAR(100),                     -- Genre or category of the book
    ISBN VARCHAR(13) NOT NULL UNIQUE,       -- Unique ISBN (NOT NULL and UNIQUE)
    Quantity INT DEFAULT 1,                 -- Number of copies available (defaults to 1)
    CONSTRAINT FK_Author FOREIGN KEY (AuthorId) REFERENCES Authors(AuthorId) -- Foreign key constraint
);


CREATE TABLE Transactions (
    TransactionId INT PRIMARY KEY IDENTITY(1,1), -- Auto-increment primary key
    StudentId INT NOT NULL,                     -- Foreign key referencing Students table
    UserId INT NOT NULL,                        -- Foreign key referencing Users table
    BookId INT NOT NULL,                        -- Foreign key referencing Books table
    TransactionType NVARCHAR(10) NOT NULL,      -- Type of transaction (Borrow or Return)
    Date DATE NOT NULL,                         -- Date of transaction
    CONSTRAINT FK_Student FOREIGN KEY (StudentId) REFERENCES Students(StudentId), -- Foreign key constraint
    CONSTRAINT FK_User FOREIGN KEY (UserId) REFERENCES Users(UserId),             -- Foreign key constraint
    CONSTRAINT FK_Book FOREIGN KEY (BookId) REFERENCES Books(BookId)              -- Foreign key constraint
);


drop table Transactions
select * from Transactions



CREATE TABLE Transactions (
    TransactionId INT PRIMARY KEY IDENTITY(1,1), -- Auto-increment primary key
    StudentId INT NOT NULL,                     -- Foreign key referencing Students table
    UserId INT NOT NULL,                        -- Foreign key referencing Users table
    BookId INT NOT NULL,                        -- Foreign key referencing Books table
    TransactionType NVARCHAR(10) NOT NULL,      -- Column to store 'Borrow' or 'Return'
    Date DATE NOT NULL,                         -- Date of transaction
    CONSTRAINT FK_Student FOREIGN KEY (StudentId) REFERENCES Students(StudentId), -- Foreign key constraint
    CONSTRAINT FK_User FOREIGN KEY (UserId) REFERENCES Users(UserId),             -- Foreign key constraint
    CONSTRAINT FK_Book FOREIGN KEY (BookId) REFERENCES Books(BookId),             -- Foreign key constraint
    CONSTRAINT CK_TransactionType CHECK (TransactionType IN ('Borrow', 'Return')) -- Check constraint for valid values
);






