import api from "./axiosConfig";

export const getUserScore = (username) => api.get(`/user/game/score/${username}`);
export const getAllScores = () => api.get("/user/game/scores");
