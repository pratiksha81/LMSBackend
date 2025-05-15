// src/pages/students/StudentPage.tsx
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import StudentForm from "../../components/students/StudentForm";
import StudentTable from "../../components/students/StudentTable";
import { Student } from "../../types/students/students";
import { fetchStudents, updateStudent, createStudent, deleteStudent } from "../../services/students/studentService";
import logo from "../../assets/StudentHead.svg";
import { toast } from "react-toastify";
import { useTheme } from "../../context/Authorization/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";

const StudentPage: React.FC = () => {
  const { theme } = useTheme();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tokens} = useAuth();
  const navigate = useNavigate();

// Redirect to login if not authenticated
useEffect(() => {
  if (!tokens) {
    navigate("/login");
  } else {
    loadStudents();
  }
}, [tokens, navigate]);


  const loadStudents = async () => {
    try {
      setLoading(true);
      const studentData = await fetchStudents();
      setStudents(studentData);
    } catch (err) {
      setError("Failed to fetch students.");
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (student: Student) => {
    try {
      if (isEdit && student.studentId) {
        await updateStudent(student);
        toast.success(`Student "${student.name}" updated successfully!`);
      } else {
        await createStudent(student);
        toast.success(`Student "${student.name}" added successfully!`);
      }
      setSelectedStudent(null);
      setIsEdit(false);
      loadStudents();
    } catch (err) {
      setError(`Failed to ${isEdit ? "update" : "add"} student.`);
      toast.error(`Failed to ${isEdit ? "update" : "add"} student`);
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEdit(true);
  };

  const handleDelete = async (studentId: number) => {
    try {
      const studentToDelete = students.find((s) => s.studentId === studentId);
      await deleteStudent(studentId);
      setStudents(students.filter((s) => s.studentId !== studentId));
      toast.success(`Student "${studentToDelete?.name}" deleted successfully!`);
    } catch (err) {
      setError("Failed to delete student.");
      toast.error("Failed to delete student");
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
          <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: theme.textColor }}>Student Info</h2>
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
              <StudentForm student={selectedStudent} isEdit={isEdit} onSubmit={handleAddOrUpdate} />
              <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;