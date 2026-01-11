package com.techduolingo.tech_duolingo.controller;

import com.techduolingo.tech_duolingo.dto.LoginResponse;
import com.techduolingo.tech_duolingo.model.User;
import com.techduolingo.tech_duolingo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginResponse request) {

        Optional<User> userOpt = userService.findByName(request.getName());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getName(),
                user.getRole()   // String: ADMIN / USER
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test-users")
    public List<User> testUsers() {
        return userService.getAllUsers();
    }
}

