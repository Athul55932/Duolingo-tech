package com.techduolingo.tech_duolingo.config;

import com.techduolingo.tech_duolingo.model.Course;
import com.techduolingo.tech_duolingo.model.Feedback;
import com.techduolingo.tech_duolingo.model.Question;
import com.techduolingo.tech_duolingo.model.User;
import com.techduolingo.tech_duolingo.repository.CourseRepository;
import com.techduolingo.tech_duolingo.repository.FeedbackRepository;
import com.techduolingo.tech_duolingo.repository.QuestionRepository;
import com.techduolingo.tech_duolingo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            UserRepository userRepository,
            CourseRepository courseRepository,
            QuestionRepository questionRepository,
            FeedbackRepository feedbackRepository
    ) {
        return args -> {

            /* ================= USERS ================= */

            User admin = userRepository.findByName("admin")
                    .orElseGet(() -> {
                        User u = new User();
                        u.setName("admin");
                        u.setPassword("admin123");
                        u.setRole("ADMIN");
                        u.setScore(0);
                        u.setProgress(0);
                        return userRepository.save(u);
                    });

            User user1 = userRepository.findByName("user1")
                    .orElseGet(() -> {
                        User u = new User();
                        u.setName("user1");
                        u.setPassword("user123");
                        u.setRole("USER");
                        u.setScore(0);
                        u.setProgress(0);
                        return userRepository.save(u);
                    });

            System.out.println("✅ Users seeded");

            /* ================= COURSES ================= */

            Course javaCourse = courseRepository.findByCourseName("Java Basics")
                    .orElseGet(() -> {
                        Course c = new Course();
                        c.setCourseName("Java Basics");
                        c.setDescription("Learn Java from scratch");
                        c.setEnrolledUsers(List.of(user1.getId()));
                        return courseRepository.save(c);
                    });

            Course springCourse = courseRepository.findByCourseName("Spring Boot")
                    .orElseGet(() -> {
                        Course c = new Course();
                        c.setCourseName("Spring Boot");
                        c.setDescription("Build REST APIs using Spring Boot");
                        c.setEnrolledUsers(List.of(user1.getId()));
                        return courseRepository.save(c);
                    });

            System.out.println("✅ Courses seeded");

            /* ================= QUESTIONS ================= */

            if (questionRepository.count() == 0) {

                Question q1 = new Question();
                q1.setCourseId(javaCourse.getId());
                q1.setQuestionText("What is JVM?");
                q1.setOptions(List.of(
                        "Java Virtual Machine",
                        "Java Variable Method",
                        "Java Vendor Model",
                        "None"
                ));
                q1.setCorrectAnswer("Java Virtual Machine");
                q1.setDifficulty("EASY");

                Question q2 = new Question();
                q2.setCourseId(javaCourse.getId());
                q2.setQuestionText("Which keyword is used to inherit a class?");
                q2.setOptions(List.of("this", "super", "extends", "implements"));
                q2.setCorrectAnswer("extends");
                q2.setDifficulty("EASY");

                Question q3 = new Question();
                q3.setCourseId(springCourse.getId());
                q3.setQuestionText("Which annotation starts a Spring Boot app?");
                q3.setOptions(List.of(
                        "@SpringBootApplication",
                        "@EnableSpring",
                        "@SpringApp",
                        "@BootSpring"
                ));
                q3.setCorrectAnswer("@SpringBootApplication");
                q3.setDifficulty("EASY");

                questionRepository.saveAll(List.of(q1, q2, q3));
                System.out.println("✅ Questions seeded");
            }

            /* ================= FEEDBACK ================= */

            if (feedbackRepository.count() == 0) {

                Feedback feedback = new Feedback();
                feedback.setUserId(user1.getId());
                feedback.setAdminId(admin.getId());
                feedback.setFeedback("Great app! Please add more courses.");
                feedback.setRead(false);
                feedback.setCreatedAt(LocalDateTime.now());

                feedbackRepository.save(feedback);
                System.out.println("✅ Feedback seeded");
            }

        };
    }
}
