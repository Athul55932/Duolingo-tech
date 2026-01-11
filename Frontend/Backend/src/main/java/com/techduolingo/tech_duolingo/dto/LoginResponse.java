package com.techduolingo.tech_duolingo.dto;

public class LoginResponse {
    private String id;
    private String name;
    private String role;
    private String password;

    public LoginResponse(String id, String name, String role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getRole() { return role; }
    public String getPassword() { return password; }
}
