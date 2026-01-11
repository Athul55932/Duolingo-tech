package com.techduolingo.tech_duolingo.dto;

public class AnswerRequest {

    private String userId;
    private String questionId;
    private String selectedAnswer;
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }


    public void setSelectedAnswer(String selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }

    public String getSelectedAnswer() {
        return selectedAnswer;
    }
}
