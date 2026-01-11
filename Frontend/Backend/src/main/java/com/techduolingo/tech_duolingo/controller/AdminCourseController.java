    package com.techduolingo.tech_duolingo.controller;

    import com.techduolingo.tech_duolingo.model.Course;
    import com.techduolingo.tech_duolingo.repository.CourseRepository;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @CrossOrigin(origins = "http://localhost:3000")
    @RestController
    @RequestMapping("/admin/courses")
    public class AdminCourseController {

        private final CourseRepository courseRepository;

        public AdminCourseController(CourseRepository courseRepository) {
            this.courseRepository = courseRepository;
        }

        // ✅ Add a new course
        @PostMapping
        public Course createCourse(@RequestBody Course course) {
            return courseRepository.save(course);
        }

        // ✅ Get all courses
        @GetMapping
        public List<Course> getAllCourses() {
            return courseRepository.findAll();
        }

        // ✅ Get a single course by ID
        @GetMapping("/{id}")
        public Course getCourseById(@PathVariable String id) {
            return courseRepository.findById(id).orElse(null);
        }

        // ✅ Delete a course by ID
        @DeleteMapping("/{id}")
        public void deleteCourse(@PathVariable String id) {
            courseRepository.deleteById(id);
        }
    }
