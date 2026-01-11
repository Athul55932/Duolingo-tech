import api from "./axiosConfig";

export const getCourses = () => api.get("/courses");

export const addCourse = (course) =>
    api.post("/admin/courses", course, {
        auth: {
            username: "user",
            password: "GENERATED_PASSWORD",
        },
    });
