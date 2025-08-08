package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.entity.Feedback;
import com.sunbeam.service.FeedbackService;

@RestController
@RequestMapping("/products/{productId}/feedback")
@CrossOrigin(origins = "http://localhost:5173") 
public class FeedbackController {

	@Autowired
    private FeedbackService feedbackService;
	
	@GetMapping
    public ResponseEntity<?> getFeedback(@PathVariable Long productId) {
        return ResponseEntity.status(HttpStatus.OK)
        		.body(feedbackService.getFeedbackForProduct(productId));
    }

    @PostMapping
    public ResponseEntity<?> postFeedback(@PathVariable Long productId, @RequestBody Feedback feedback) {
        return ResponseEntity.status(HttpStatus.CREATED)
        		.body(feedbackService.addFeedback(productId, feedback));
    }
}
