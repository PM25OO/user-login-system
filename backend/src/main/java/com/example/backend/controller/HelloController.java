package com.example.backend.controller;

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

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }

    @GetMapping("/protected")
    public Map<String, Object> protectedHello(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        String token = (String) request.getAttribute("token");
        if (JwtUtil.parseToken(token) == null) {
            response.put("success", false);
        }
        return response;
    }
}
