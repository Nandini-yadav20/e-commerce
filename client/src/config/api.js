const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : "http://localhost:5000/api");

export default API_URL;
