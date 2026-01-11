package com.techduolingo.tech_duolingo.service;

import com.techduolingo.tech_duolingo.model.Question;
import com.techduolingo.tech_duolingo.model.User;
import com.techduolingo.tech_duolingo.repository.QuestionRepository;
import com.techduolingo.tech_duolingo.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public GameService(QuestionRepository questionRepository,
                       UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public boolean checkAnswer(String questionId, String selectedOption, String userId) {

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean correct = question.getCorrectAnswer()
                .equalsIgnoreCase(selectedOption);

        if (correct) {
            user.setScore(user.getScore() + 10);
            user.setProgress(user.getProgress() + 5);
            userRepository.save(user);
        }

        return correct;
    }
}
