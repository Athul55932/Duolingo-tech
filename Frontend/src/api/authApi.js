import api from "./axiosConfig";

export const login = (data) => api.post("/auth/login", data);
