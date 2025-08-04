package com.sunbeam.service;

import com.sunbeam.dto.RegisterRequest;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.LoginRequest;
import com.sunbeam.entity.User;
import com.sunbeam.exception.CustomException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterRequest request) {
    	
    	System.out.println("📩 User Received registration request:");
        System.out.println("Name: " + request.fullName);
        System.out.println("Address:" +request.address);
        System.out.println("Email: " + request.email);
        System.out.println("Password: " + request.password);
        System.out.println("Phone: " + request.phoneNumber);
    	
        if (userRepo.findByEmail(request.email).isPresent()) {
            throw new CustomException("Email already exists");
        }

        User user = new User();
        user.setFullName(request.fullName);
        user.setAddress(request.address);
        user.setEmail(request.email);

        // 🔐 Encrypt the password using BCrypt
        String hashedPassword = passwordEncoder.encode(request.password);
        user.setPassword(hashedPassword);

        user.setPhoneNumber(request.phoneNumber);

        return userRepo.save(user);
    }

    @Override
    public User loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepo.findByEmail(request.email);

        if (userOpt.isEmpty()) {
            throw new CustomException("Invalid email or password");
        }

        User user = userOpt.get();

        // 🔐 Match raw password with hashed password
        if (!passwordEncoder.matches(request.password, user.getPassword())) {
            throw new CustomException("Invalid email or password");
        }

        return user;
    }

	@Override
	public List<User> getAllUsers() {
		return userRepo.findByStatusTrue();
	}
	
	@Override
	public String softdelete(Long id) {
	    User old = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	    old.setStatus(false);
	    userRepo.save(old); // ✅ you must save it to persist change
	    return "User deactivated (soft deleted)";
	}
}

