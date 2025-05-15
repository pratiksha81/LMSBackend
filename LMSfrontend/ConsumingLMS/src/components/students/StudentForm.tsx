import { useTheme } from "../../context/Authorization/ThemeContext";
import { Student } from "../../types/students/students";
import { useStudentForm } from "../../hooks/useStudentForm";

interface StudentFormProps {
  student?: Student | null;
  isEdit: boolean;
  onSubmit: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, isEdit, onSubmit }) => {
  const { theme } = useTheme();
  const { formData, handleChange, handleSubmit } = useStudentForm(student || null, onSubmit);

  return (
    <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow, marginBottom: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="studentId" value={formData.studentId} />
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Student Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
          />
        </div>
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem", background: theme.inputBackground, borderRadius: "0.375rem", color: theme.textColor, border: "none" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.875rem", fontWeight: "500", color: theme.textColor }}>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
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
          {isEdit ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
