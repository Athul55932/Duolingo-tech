import api from "./axiosConfig";

export const startGame = (courseId) =>
    api.get(`/user/game/start/${courseId}`, {
        auth: {
            username: "user",
            password: "GENERATED_PASSWORD",
        },
    });

export const submitGame = (payload) =>
    api.post("/user/game/submit", payload, {
        auth: {
            username: "user",
            password: "GENERATED_PASSWORD",
        },
    });
