package com.techduolingo.tech_duolingo.repository;
import com.techduolingo.tech_duolingo.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByUserIdAndReadFalse(String userId);
}
