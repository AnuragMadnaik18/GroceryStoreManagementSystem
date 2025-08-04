package com.sunbeam.service;

import com.sunbeam.dto.RegisterRequest;

import java.util.List;

import com.sunbeam.dto.LoginRequest;
import com.sunbeam.entity.User;

public interface UserService {
    User registerUser(RegisterRequest request);
    User loginUser(LoginRequest request);
    List<User> getAllUsers();
    String softdelete(Long id);
}
        