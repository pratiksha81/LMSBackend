import { useState, useEffect, FormEvent, useRef } from "react";
import { Book, IssuingTransaction, Student } from "../../types/issuing/Issuing";
import { fetchBooks } from "../../services/books/bookService";
import { fetchStudents } from "../../services/students/studentService";
import { useTheme } from "../../context/Authorization/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";

interface IssuingFormProps {
  onSubmit: (transaction: IssuingTransaction) => void;
}

const IssuingForm: React.FC<IssuingFormProps> = ({ onSubmit }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<IssuingTransaction>({
    studentId: 0,
    userId: 0,
    bookId: 0,
    transactionType: "Borrow",
    date: new Date().toISOString().split("T")[0],
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentSelectRef = useRef<HTMLSelectElement>(null);
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const bookSelectRef = useRef<HTMLSelectElement>(null);
  const transactionTypeSelectRef = useRef<HTMLSelectElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const { tokens} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    } else {
      loadData();
    }
  }, [tokens, navigate]);


  const loadData = async () => {
    try {
      setLoading(true);
      const [studentData, bookData] = await Promise.all([
        fetchStudents(),
        fetchBooks(),
      ]);
      setStudents(studentData);
      setBooks(bookData);
    } catch (err) {
      setError("Failed to load students or books.");
    } finally {
      setLoading(false);
      studentSelectRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.studentId === 0 || formData.bookId === 0 || formData.userId === 0) {
      setError("Please fill all required fields.");
      return;
    }
    onSubmit(formData);
    setFormData({
      studentId: 0,
      userId: 0,
      bookId: 0,
      transactionType: "Borrow",
      date: new Date().toISOString().split("T")[0],
    });
    setError(null);
    studentSelectRef.current?.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "studentId" || name === "bookId" || name === "userId"
          ? Number(value)
          : value,
    }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
    nextRef: React.RefObject<any>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  if (loading) return <div style={{ color: theme.textColor }}>Loading...</div>;

  return (
    <div style={{ background: theme.cardBackground, padding: "22px 34px", borderRadius: "8px", boxShadow: theme.shadow, marginBottom: "1rem" }}>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-8">
            <label style={{ fontSize: "14px", fontWeight: "bold", color: theme.textColor }}>Student</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, userIdInputRef)}
              required
              ref={studentSelectRef}
              style={{ height: "65px", background: theme.inputBackground, border: "none", borderRadius: "4px", width: "100%", padding: "0 10px", color: theme.textColor }}
            >
              <option value={0} disabled>Select a Student</option>
              {students.map((student) => (
                <option key={student.studentId} value={student.studentId}>{student.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label style={{ fontSize: "14px", fontWeight: "bold", color: theme.textColor }}>User ID</label>
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, bookSelectRef)}
              required
              ref={userIdInputRef}
              style={{ height: "65px", background: theme.inputBackground, border: "none", borderRadius: "4px", width: "100%", padding: "0 10px", color: theme.textColor }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label style={{ fontSize: "14px", fontWeight: "bold", color: theme.textColor }}>Book</label>
            <select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, transactionTypeSelectRef)}
              required
              ref={bookSelectRef}
              style={{ height: "65px", background: theme.inputBackground, border: "none", borderRadius: "4px", width: "100%", padding: "0 10px", color: theme.textColor }}
            >
              <option value={0} disabled>Select a Book</option>
              {books.map((book) => (
                <option key={book.bookId} value={book.bookId}>{book.title}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label style={{ fontSize: "14px", fontWeight: "bold", color: theme.textColor }}>Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, dateInputRef)}
              required
              ref={transactionTypeSelectRef}
              style={{ height: "65px", background: theme.inputBackground, border: "none", borderRadius: "4px", width: "100%", padding: "0 10px", color: theme.textColor }}
            >
              <option value="Borrow">Borrow</option>
              <option value="Return">Return</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label style={{ fontSize: "14px", fontWeight: "bold", color: theme.textColor }}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, studentSelectRef)}
            required
            ref={dateInputRef}
            style={{ height: "65px", background: theme.inputBackground, border: "none", borderRadius: "4px", width: "100%", padding: "0 10px", color: theme.textColor }}
          />
        </div>

        <button
          type="submit"
          style={{ background: theme.primaryColor, fontSize: "15px", fontWeight: 800, width: "160px", color: theme.buttonTextColor, padding: "21px 56px", border: "none", borderRadius: "20px" }}
        >
          ISSUE
        </button>
      </form>
    </div>
  );
};

export default IssuingForm;