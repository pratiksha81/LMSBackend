// src/pages/books/BookPage.tsx
import { useState, useEffect } from "react";
import { Book } from "../../types/books/books";
import Navbar from "../../components/Navbar";
import BookForm from "../../components/books/BookForm";
import BookTable from "../../components/books/BookTable";
import logo from "../../assets/BookHead.svg";
import { fetchBooks, updateBook, createBook, deleteBook } from "../../services/books/bookService";
import { toast } from "react-toastify";
import { useTheme } from "../../context/Authorization/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";

const BookPage: React.FC = () => {
  const { theme } = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tokens} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    } else {
      loadBooks();
    }
  }, [tokens, navigate]);


  const loadBooks = async () => {
    try {
      setLoading(true);
      const bookData = await fetchBooks();
      setBooks(bookData);
    } catch (err) {
      setError("Failed to fetch books.");
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (book: Book) => {
    try {
      if (isEdit && book.bookId) {
        await updateBook(book);
        toast.success(`Book "${book.title}" updated successfully!`);
      } else {
        await createBook(book);
        toast.success(`Book "${book.title}" added successfully!`);
      }
      setSelectedBook(null);
      setIsEdit(false);
      loadBooks();
    } catch (err) {
      setError(`Failed to ${isEdit ? "update" : "add"} book.`);
      toast.error(`Failed to ${isEdit ? "update" : "add"} book`);
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEdit(true);
  };

  const handleDelete = async (bookId: number) => {
    try {
      const bookToDelete = books.find((b) => b.bookId === bookId);
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
      toast.success(`Book "${bookToDelete?.title}" deleted successfully!`);
    } catch (err) {
      setError("Failed to delete book.");
      toast.error("Failed to delete book");
    }
  };


  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ marginLeft: "222px", width: "100%" }}>
        <div
          style={{
            height: "65px",
            background: theme.cardBackground,
            boxShadow: theme.shadow,
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }} />
          <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: theme.textColor }}>Book Info</h2>
        </div>
        <div
          style={{
            background: theme.background,
            padding: "1.25rem",
            height: "calc(100vh - 65px)",
            overflowY: "auto",
          }}
        >
          {error && (
            <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "0.75rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          {loading ? (
            <div style={{ textAlign: "center", color: theme.textColor }}>Loading...</div>
          ) : (
            <>
              <BookForm book={selectedBook} isEdit={isEdit} onSubmit={handleAddOrUpdate} />
              <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;