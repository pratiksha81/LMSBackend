import { Author } from "../../types/authors/authors";
import { useTheme } from "../../context//Authorization/ThemeContext";

interface AuthorTableProps {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (authorId: number) => void;
}

const AuthorTable: React.FC<AuthorTableProps> = ({ authors, onEdit, onDelete }) => {
  const { theme } = useTheme();

  return (
    <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
      <h3 style={{ fontWeight: "600", fontSize: "1.125rem", color: theme.textColor, marginBottom: "0.75rem" }}>Author List</h3>
      <div className="overflow-x-auto">
        <table style={{ width: "100%", background: "#fff", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
          <thead style={{ background: theme.tableHeaderBg, color: theme.buttonTextColor }}>
            <tr>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Author ID</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Bio</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((author) => (
                <tr
                  key={author.authorID}
                  style={{ borderBottom: "1px solid #e5e7eb" }}
                  className="last:border-none hover:bg-[var(--tableRowHover)]"
                >
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{author.authorID}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{author.name}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{author.bio}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>
                    <button
                      onClick={() => onEdit(author)}
                      style={{ width: "5rem", background: "#d97706", color: "#fff", borderRadius: "0.75rem", marginRight: "0.5rem", padding: "0.25rem 0" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(author.authorID)}
                      style={{ width: "5rem", background: "#dc2626", color: "#fff", borderRadius: "0.75rem", padding: "0.25rem 0" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "1.25rem", color: "#6b7280" }}>
                  No authors available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorTable;