// src/components/BookForm.tsx
import React from "react";
import { Book } from "../../types/books/books";
import { useTheme } from "../../context/Authorization/ThemeContext";
import { useBookForm } from "../../hooks/useBookForm";

interface BookFormProps {
  book?: Book | null;
  isEdit: boolean;
  onSubmit: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, isEdit, onSubmit }) => {
  const { theme } = useTheme();
  const { formData, handleChange, handleSubmit } = useBookForm({ book, onSubmit });

  return (
    <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow, marginBottom: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="bookId" value={formData.bookId} />
        <div className="mb-3">
          <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Author ID</label>
            <input
              type="number"
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{ background: theme.primaryColor, color: theme.buttonTextColor, padding: "0.5rem 1.25rem", borderRadius: "0.375rem", border: "none" }}
        >
          {isEdit ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
