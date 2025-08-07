package com.sunbeam.controller;

import com.sunbeam.dto.LoginRequest;
import com.sunbeam.dto.RegisterRequest;
import com.sunbeam.entity.User;
import com.sunbeam.security.JwtUtil;
import com.sunbeam.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- Register a new user ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // Encode password before saving
            request.setPassword(passwordEncoder.encode(request.getPassword()));
            User user = userService.registerUser(request);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "data", user
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "status", "error",
                            "error", e.getMessage()
                    ));
        }
    }

    // --- Authenticate user and return JWT ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword());
            auth = authenticationManager.authenticate(auth);
            String token = jwtUtil.createToken(auth);
            
            User user = userService.loginUser(request);
            
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "data", Map.of(
                            "id", user.getId(),
                            "fullName", user.getFullName(),
                            "email", user.getEmail(),
                            "phoneNumber", user.getPhoneNumber(),
                            "address", user.getAddress()
                    ),
                    "token", token
            ));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "status", "error",
                            "error", "Invalid email or password"
                    ));
        }
    }

    // --- Get all users ---
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.getAllUsers());
    }

    // --- Soft delete a user ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        String result = userService.softdelete(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}