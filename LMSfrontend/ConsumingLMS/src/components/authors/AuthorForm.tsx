import { useState, useEffect, FormEvent, useRef } from 'react';
import { Author } from "../../types/authors/authors";
import { useTheme } from "../../context/Authorization/ThemeContext";

interface AuthorFormProps {
  author?: Author | null;
  isEdit: boolean;
  onSubmit: (author: Author) => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ author, isEdit, onSubmit }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<Author>({
    authorID: 0,
    name: "",
    bio: "",
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const bioTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (author) {
      setFormData(author);
    } else {
      setFormData({ authorID: 0, name: "", bio: "" });
    }
    nameInputRef.current?.focus();
  }, [author]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ authorID: 0, name: "", bio: "" });
    nameInputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, nextRef: React.RefObject<any>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow, marginBottom: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="authorId" value={formData.authorID} />
        <div className="mb-3">
          <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, bioTextareaRef)}
            required
            ref={nameInputRef}
            style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
          />
        </div>
        <div className="mb-3">
          <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Biography</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
            required
            ref={bioTextareaRef}
            style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
          />
        </div>
        <button
          type="submit"
          style={{ background: theme.primaryColor, color: theme.buttonTextColor, padding: "0.5rem 1.25rem", borderRadius: "0.375rem", border: "none" }}
        >
          {isEdit ? "Update Author" : "Add Author"}
        </button>
      </form>
    </div>
  );
};

export default AuthorForm;