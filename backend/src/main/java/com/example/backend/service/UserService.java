package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    public final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register
    public User register(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password); // TODO:暂时明文存储，后续需加密

        return userRepository.save(user);
    }

    // Login
    public Optional<User> login(String name, String password) {
        return userRepository.findByUsername(name)
                .filter(u -> u.getPassword().equals(password));
    }

}
