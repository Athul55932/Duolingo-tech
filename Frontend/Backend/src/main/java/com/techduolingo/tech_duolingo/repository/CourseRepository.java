package com.techduolingo.tech_duolingo.repository;

import com.techduolingo.tech_duolingo.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CourseRepository extends MongoRepository<Course, String> {

    Optional<Course> findByCourseName(String courseName);

}
