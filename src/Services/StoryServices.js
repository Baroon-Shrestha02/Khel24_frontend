import api from "./AxiosInstance";

export const fetchStories = () => api.get("/get-stories");
