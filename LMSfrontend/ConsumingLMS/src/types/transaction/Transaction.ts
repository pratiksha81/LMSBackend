// src/domain/transactions/transactions.ts
export interface Transaction {
    transactionId: number;
    studentId: number;
    user: string;
    userId: number;
    bookId: number;
    transactionType: "borrow" | "return"; // Updated to lowercase
    date: string;
    studentName?: string;
    bookTitle?: string;
    username?: string;
  }