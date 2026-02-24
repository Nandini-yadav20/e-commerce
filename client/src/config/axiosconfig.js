import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-qdh9.onrender.com/api",
  withCredentials: true, 
});

export default api;