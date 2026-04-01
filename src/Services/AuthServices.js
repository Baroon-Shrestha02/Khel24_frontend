import api from "./AxiosInstance";

export const login = (data) => api.post("/login", data);
export const logout = () => api.post("/logout");
export const loggedUser = () => api.get("/logged-user");
export const register = (data) => api.post("/register", data);
