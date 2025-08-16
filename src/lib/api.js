// src/lib/api.js
import axios from "axios";

// Fuerza el backend de Render para producción.
// (cuando todo funcione, volvemos a la versión con VITE_API_URL)
const api = axios.create({
  baseURL: "https://blogbackend-qbm2.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
