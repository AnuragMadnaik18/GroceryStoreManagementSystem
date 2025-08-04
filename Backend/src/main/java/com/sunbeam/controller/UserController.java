package com.sunbeam.controller;


import com.sunbeam.dto.LoginRequest;
import com.sunbeam.dto.RegisterRequest;
import com.sunbeam.entity.User;
import com.sunbeam.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173") 
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.loginUser(request);
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "data", user
            ));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                        "status", "error",
                        "error", e.getMessage()
                    ));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(){
    	return ResponseEntity.status(HttpStatus.OK)
    			.body(userService.getAllUsers());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        String result = userService.softdelete(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
