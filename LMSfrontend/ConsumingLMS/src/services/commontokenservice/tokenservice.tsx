import axios from "axios";
import {API_URL} from "../../API_URL/env"

// Create an Axios instance with default headers
export const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
    // Add an interceptor to include the token in every request
    api.interceptors.request.use((config) => {
      const tokens = JSON.parse(localStorage.getItem("tokens") || "null"); // Get tokens from localStorage
      if (tokens?.accessToken) {
        config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });