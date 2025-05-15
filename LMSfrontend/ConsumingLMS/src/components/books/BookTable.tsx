import { Book } from "../../types/books/books";
import { useTheme } from "../../context/Authorization/ThemeContext";

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete }) => {
  const { theme } = useTheme();

  return (
    <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
      <h3 style={{ fontWeight: "600", fontSize: "1.125rem", color: theme.textColor, marginBottom: "0.75rem" }}>Book List</h3>
      <div className="overflow-x-auto">
        <table style={{ width: "100%", background: "#fff", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
          <thead style={{ background: theme.tableHeaderBg, color: theme.buttonTextColor }}>
            <tr>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Book ID</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Title</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Author ID</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Genre</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>ISBN</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Quantity</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.bookId} style={{ borderBottom: "1px solid #e5e7eb" }} className="last:border-none hover:bg-[var(--tableRowHover)]">
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{book.bookId}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{book.title}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{book.authorId}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{book.genre}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{book.isbn}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{book.quantity}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>
                    <button onClick={() => onEdit(book)} style={{ width: "5rem", background: "#d97706", color: "#fff", borderRadius: "0.75rem", marginRight: "0.5rem", padding: "0.25rem 0" }}>Edit</button>
                    <button onClick={() => onDelete(book.bookId)} style={{ width: "5rem", background: "#dc2626", color: "#fff", borderRadius: "0.75rem", padding: "0.25rem 0" }}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "1.25rem", color: "#6b7280" }}>No books available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;