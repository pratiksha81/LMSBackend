// src/domain/issuing/Issuing.ts
export interface IssuingTransaction {
    studentId: number; // Changed to camelCase
    userId: number;   // Changed to camelCase and number type
    bookId: number;   // Changed to camelCase
    transactionType: "Borrow" | "Return"; // Changed to camelCase
    date: string;     // Keeping as string; backend seems to accept "2025-03-21"
  }
  
  export interface Student {
    studentId: number;
    name: string;
    email?: string;
    contactNumber?: string;
    department?: string;
  }
  
  export interface Book {
    bookId: number;
    title: string;
    authorId?: number;
    genre?: string;
    isbn?: string;
    quantity?: number;
  }