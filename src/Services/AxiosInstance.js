import axios from "axios";

const api = axios.create({
  baseURL: `https://blog-lsfk.onrender.com/api`,
  withCredentials: true,
});

export default api;
