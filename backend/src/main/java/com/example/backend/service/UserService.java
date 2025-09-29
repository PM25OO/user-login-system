package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    public final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(12);
    }

    // Register
    public User register(String username, String email, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("用户名已存在");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("邮箱已存在");
        }

        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    // Login
    public Optional<User> login(String username, String rawPassword) {
        Optional<User> maybe = userRepository.findByUsername(username);
        if (maybe.isPresent()) {
            User u = maybe.get();
            if (passwordEncoder.matches(rawPassword, u.getPassword())) {
                return maybe;
            }
        }
        return Optional.empty();
    }


}
