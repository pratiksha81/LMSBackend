// src/pages/authors/AuthorPage.tsx
import { useState, useEffect } from "react";
import { Author } from "../../types/authors/authors";
import Navbar from "../../components/Navbar";
import AuthorTable from "../../components/authors/AuthorTable";
import AuthorForm from "../../components/authors/AuthorForm";
import { getAuthors, updateAuthor, addAuthor, deleteAuthor } from "../../services/Author/AuthorService";
import { toast } from "react-toastify";
import { useTheme } from "../../context/Authorization/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";

const AuthorPage: React.FC = () => {
  const { theme } = useTheme();
  const [authors, setAuthors] = useState<Author[]>([]);//costume Hook
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { tokens} = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
useEffect(() => {
  if (!tokens) {
    navigate("/login");
  } else {
    fetchAuthors();
  }
}, [tokens, navigate]);


  const fetchAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (err) {
      toast.error("Failed to fetch authors");
      console.error("Failed to fetch authors.");
    }
  };

  const handleAddOrUpdate = async (author: Author) => {
    try {
      if (isEdit && author.authorID) {
        await updateAuthor(author);
        toast.success(`Author "${author.name}" updated successfully!`);
      } else {
        await addAuthor(author);
        toast.success(`Author "${author.name}" added successfully!`);
      }
      fetchAuthors();
      setSelectedAuthor(null);
      setIsEdit(false);
    } catch (err) {
      toast.error(`Failed to ${isEdit ? "update" : "add"} author`);
      console.error(`Failed to ${isEdit ? "update" : "add"} author.`);
    }
  };

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
    setIsEdit(true);
  };

  const handleDelete = async (authorId: number) => {
    try {
      const authorToDelete = authors.find((a) => a.authorID === authorId);
      await deleteAuthor(authorId);
      fetchAuthors();
      toast.success(`Author "${authorToDelete?.name}" deleted successfully!`);
    } catch (err) {
      toast.error("Failed to delete author");
      console.error("Failed to delete author", err);
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
          <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: theme.textColor }}>Author Info</h2>
        </div>
        <div
          style={{
            background: theme.background,
            padding: "1.25rem",
            height: "calc(100vh - 65px)",
            overflowY: "auto",
          }}
        >
          <AuthorForm author={selectedAuthor} isEdit={isEdit} onSubmit={handleAddOrUpdate} />
          <AuthorTable authors={authors} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;