const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : "https://e-commerce-qdh9.onrender.com/api");

export default API_URL;
