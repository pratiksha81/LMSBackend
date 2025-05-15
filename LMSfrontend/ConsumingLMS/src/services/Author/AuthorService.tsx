
import { Author } from "../../types/authors/authors";
import {api} from "../../services/commontokenservice/tokenservice"

export const getAuthors = async (): Promise<Author[]> => {
  const response = await api.get<Author[]>(`/Authors`);//URL API 
  return response.data;
};
export const addAuthor = async (author: Author): Promise<Author> => {
  const response = await api.post(`/Authors`, author);
  return response.data;
};

export const updateAuthor = async (author: Author): Promise<void> => {
  await api.put(`/Authors/${author.authorID}`, author);
};

export const deleteAuthor = async (authorID: number): Promise<void> => {
  await api.delete(`/Authors/${authorID}`);
};
