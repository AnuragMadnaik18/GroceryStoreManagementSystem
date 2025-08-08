package com.sunbeam.service;

import java.util.List;

import com.sunbeam.entity.Feedback;

public interface FeedbackService {
	public List<Feedback> getFeedbackForProduct(Long productId);
	public Feedback addFeedback(Long productId, Feedback feedback);
	
}
