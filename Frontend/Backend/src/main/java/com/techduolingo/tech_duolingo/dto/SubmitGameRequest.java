package com.techduolingo.tech_duolingo.dto;

import java.util.List;

public class SubmitGameRequest {
    private String userId;
    private String courseId;
    private List<AnswerRequest> answers;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCourseId() { return courseId; }   // ✅ fix
    public void setCourseId(String courseId) { this.courseId = courseId; } // ✅ fix

    public List<AnswerRequest> getAnswers() { return answers; }
    public void setAnswers(List<AnswerRequest> answers) { this.answers = answers; }
}
