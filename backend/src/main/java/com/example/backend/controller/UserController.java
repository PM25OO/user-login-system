package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register API
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String email = body.get("email");
        String password = body.get("password");
        User user;
        try {
            user = userService.register(username, email, password);
        } catch (Exception e) {
            user = null;
        }


        Map<String, Object> response = new HashMap<>();
        if (user == null) {
            response.put("success", false);
            response.put("message", "Register failed: Existed User");
        } else {
            response.put("success", true);
            response.put("message", "Register successful");
        }

        return response;
    }

    // Login API
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<User> user = userService.login(username, password);

        Map<String, Object> response = new HashMap<>();
        if (user.isPresent()) {
            String token = JwtUtil.generateToken(user.get().getUsername());

            response.put("success", true);
            response.put("message", "Login success");
            response.put("username", user.get().getUsername());
            response.put("token", token);
        } else {
            response.put("success", false);
            response.put("message", "Invalid username or password");
        }

        return response;
    }


}
