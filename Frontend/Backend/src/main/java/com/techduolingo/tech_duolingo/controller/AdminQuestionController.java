package com.techduolingo.tech_duolingo.controller;

import com.techduolingo.tech_duolingo.model.Question;
import com.techduolingo.tech_duolingo.repository.QuestionRepository;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/admin/questions")
public class AdminQuestionController {

    private final QuestionRepository questionRepository;

    public AdminQuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }
}
