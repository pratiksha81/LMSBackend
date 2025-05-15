import axios from "axios";
import { LoginDTO, Tokens, User } from "../../types/Authorization/authModel";
const API_URL = 'http://localhost:8000/api/Auth';

export const login = async (credentials: LoginDTO): Promise<Tokens> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  };
   
  export const signup = async (user: User): Promise<void> => {
    await axios.post(`${API_URL}/signup`, user);
  };