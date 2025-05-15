
import { Book } from "../../types/books/books";
import {api} from "../../services/commontokenservice/tokenservice"

// Fetch all books
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>(`/Books`); ///Books is API URL 
  return response.data;
};

// Create a new book
export const createBook = async (book: Book): Promise<Book> => {
  const response = await api.post<Book>(`/Books`, book);
  return response.data;
};

// Update an existing book
export const updateBook = async (book: Book): Promise<void> => {
  await api.put(`/Books/${book.bookId}, `, book);
};

// Delete a book
export const deleteBook = async (bookId: number): Promise<void> => {
  await api.delete(`/Books/${bookId}`,);
};
