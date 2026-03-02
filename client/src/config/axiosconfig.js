import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : "http://localhost:5000/api");

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;