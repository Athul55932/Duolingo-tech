package com.techduolingo.tech_duolingo.repository;

import com.techduolingo.tech_duolingo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByName(String name);
}