// src/hooks/useBookForm.ts
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Book } from "../types/books/books";

interface UseBookFormProps {
  book?: Book | null;
  onSubmit: (book: Book) => void;
}

export const useBookForm = ({ book, onSubmit }: UseBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: "",
    authorId: 0,
    genre: "",
    isbn: "",
    quantity: 0,
  });

  useEffect(() => {
    if (book) setFormData(book);
  }, [book]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "authorId" || name === "quantity" ? +value : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return { formData, handleChange, handleSubmit };
};
