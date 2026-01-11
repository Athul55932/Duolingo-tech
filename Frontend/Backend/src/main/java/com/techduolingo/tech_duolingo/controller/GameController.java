package com.techduolingo.tech_duolingo.controller;

import com.techduolingo.tech_duolingo.dto.AnswerRequest;
import com.techduolingo.tech_duolingo.dto.SubmitGameRequest;
import com.techduolingo.tech_duolingo.model.Question;
import com.techduolingo.tech_duolingo.model.User;
import com.techduolingo.tech_duolingo.repository.QuestionRepository;
import com.techduolingo.tech_duolingo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/user/game")
public class GameController {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;


    public GameController(QuestionRepository questionRepository,
                          UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("/start/{courseId}")
    public List<Question> startGame(@PathVariable String courseId) {
        List<Question> questions = questionRepository.findByCourseId(courseId);
        Collections.shuffle(questions);
        return questions.stream().limit(10).toList();
    }
    // ✅ Fetch score of a specific user
    @GetMapping("/score/{username}") public Map<String, Object> getUserScore(@PathVariable String username) { User user = userRepository.findByName(username) .orElseThrow(() -> new RuntimeException("User not found")); Map<String, Object> response = new HashMap<>(); response.put("userId", user.getId()); response.put("name", user.getName()); response.put("score", user.getScore()); return response; }

    // ✅ Fetch scores of all users
    @GetMapping("/scores")
    public List<Map<String, Object>> getAllUserScores() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", user.getId());
            map.put("name", user.getName());
            map.put("score", user.getScore());
            return map;
        }).toList();
    }




    @PostMapping("/submit")
    public Map<String, Object> submitGame(@RequestBody SubmitGameRequest request) {

        int correct = 0;

        for (AnswerRequest ans : request.getAnswers()) {
            Question q = questionRepository.findById(ans.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            if (q.getCorrectAnswer().equals(ans.getSelectedAnswer())) {
                correct++;
            }
        }

        int score = correct * 10;

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setScore(score);
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("correctAnswers", correct);
        response.put("totalQuestions", request.getAnswers().size());

        return response;
    }

}
