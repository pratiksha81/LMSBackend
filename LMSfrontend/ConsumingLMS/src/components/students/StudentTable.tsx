import { Student } from "../../types/students/students";
import { useTheme } from "../../context/Authorization/ThemeContext";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
  const { theme } = useTheme();

  return (
    <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
      <h3 style={{ fontWeight: "600", fontSize: "1.125rem", color: theme.textColor, marginBottom: "0.75rem" }}>Student Details</h3>
      <div className="overflow-x-auto">
        <table style={{ width: "100%", background: "#fff", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
          <thead style={{ background: theme.tableHeaderBg, color: theme.buttonTextColor }}>
            <tr>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Student ID</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Email</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Contact</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Department</th>
              <th style={{ padding: "0.75rem", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.studentId} style={{ borderBottom: "1px solid #e5e7eb" }} className="last:border-none hover:bg-[var(--tableRowHover)]">
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{student.studentId}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{student.name}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{student.email}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{student.contactNumber}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{student.department}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>
                    <button onClick={() => onEdit(student)} style={{ width: "5rem", background: "#d97706", color: "#fff", borderRadius: "0.75rem", marginRight: "0.5rem", padding: "0.25rem 0" }}>Edit</button>
                    <button onClick={() => onDelete(student.studentId)} style={{ width: "5rem", background: "#dc2626", color: "#fff", borderRadius: "0.75rem", padding: "0.25rem 0" }}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "1.25rem", color: "#6b7280" }}>
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;