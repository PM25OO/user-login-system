package com.example.backend.controller;

import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class HelloController {

    private final UserService userService;

    public HelloController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @GetMapping("/protected")
    public Map<String, Object> protectedHello(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();

        // 从请求头中获取 Authorization 字段
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.put("success", false);
            response.put("message", "Missing or invalid Authorization header");
            return response;
        }

        // 提取 token（去掉 "Bearer " 前缀）
        String token = authHeader.substring(7);

        if (JwtUtil.parseToken(token) == null) {
            response.put("success", false);
            response.put("message", "Invalid or expired token");
        } else {
            response.put("success", true);
            response.put("message", "login successfully!");
            response.put("database", userService.userRepository.findAll());
        }
        return response;
    }
}
