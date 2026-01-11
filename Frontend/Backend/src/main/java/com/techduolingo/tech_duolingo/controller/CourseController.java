package com.techduolingo.tech_duolingo.controller;

import com.techduolingo.tech_duolingo.model.Course;
import com.techduolingo.tech_duolingo.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
