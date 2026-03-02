import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : "https://e-commerce-qdh9.onrender.com/api");

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export default api;