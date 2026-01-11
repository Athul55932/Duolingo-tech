package com.techduolingo.tech_duolingo.repository;

import com.techduolingo.tech_duolingo.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByCourseId(String courseId);
}
