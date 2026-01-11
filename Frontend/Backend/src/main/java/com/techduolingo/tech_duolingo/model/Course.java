package com.techduolingo.tech_duolingo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "courses")
@Data
public class Course {

    @Id
    private String id;

    private String courseName;
    private List<String> enrolledUsers;
    private String description;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public List<String> getEnrolledUsers() {
        return enrolledUsers;
    }

    public void setEnrolledUsers(List<String> enrolledUsers) {
        this.enrolledUsers = enrolledUsers;
    }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

