
import { Student } from "../../types/students/students";
import {api} from "../../services/commontokenservice/tokenservice"

// Fetch all students
export const fetchStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>(`/Students`);
  return response.data;
};

// Create a new student
export const createStudent = async (student: Student): Promise<Student> => {
  const response = await api.post<Student>(`/Students`, student);
  return response.data;
};

// Update an existing student
export const updateStudent = async (student: Student): Promise<void> => {
  await api.put(`/Students/${student.studentId}`, student);
};

// Delete a student
export const deleteStudent = async (studentId: number): Promise<void> => {
  await api.delete(`/Students/${studentId}`);
};
