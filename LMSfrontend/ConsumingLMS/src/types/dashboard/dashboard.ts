export interface Dashboard {
    totalStudents: number;
    totalBook: number;
    totalTransaction: number;
    totalBooksBorrowed: number;
    totalBooksReturned: number;
  }
  
  export interface OverdueBorrower {
    name: string;
    borrowedId: string;
  }