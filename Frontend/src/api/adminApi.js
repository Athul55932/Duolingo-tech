import axios from "axios";

const API_BASE = "http://localhost:8080"; // Spring Boot backend

export const addCourse = async (course) => {
    return axios.post(`${API_BASE}/admin/courses`, course);
};

export const addQuestion = async (question) => {
    return axios.post(`${API_BASE}/admin/questions`, question);
};
