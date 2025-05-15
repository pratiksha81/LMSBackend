import { useEffect, useState } from "react";
import { Student } from "../types/students/students";

export const useStudentForm = (student: Student | null, onSubmit: (student: Student) => void) => {
  const [formData, setFormData] = useState<Student>({
    studentId: 0,
    name: "",
    email: "",
    contactNumber: "",
    department: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        studentId: 0,
        name: "",
        email: "",
        contactNumber: "",
        department: "",
      });
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return { formData, handleChange, handleSubmit };
};
