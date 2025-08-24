package com.sunbeam.service;

import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.LoginRequest;
import com.sunbeam.dto.RegisterRequest;
import com.sunbeam.entity.User;
import com.sunbeam.exception.CustomException;
import com.sunbeam.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public User registerUser(RegisterRequest request) {
        System.out.println("📩 User Received registration request:");
        System.out.println("Name: " + request.getFullName());
        System.out.println("Address:" + request.getAddress());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());
        System.out.println("Phone: " + request.getPhoneNumber());

        if (userDao.findByEmail(request.getEmail()).isPresent()) {
            throw new CustomException("Email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setAddress(request.getAddress());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());
        return userDao.save(user);
    }

 
    
    @Override
    public User loginUser(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Only return the user
            return userDao.findByEmail(request.getEmail())
                          .orElseThrow(() -> new CustomException("User not found"));

        } catch (Exception e) {
            throw new CustomException("Invalid email or password");
        }
    }


    @Override
    public List<User> getAllUsers() {
        return userDao.findByStatusTrue();
    }

    @Override
    public String softdelete(Long id) {
        User old = userDao.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        old.setStatus(false);
        userDao.save(old);
        return "User deactivated (soft deleted)";
    }
}

