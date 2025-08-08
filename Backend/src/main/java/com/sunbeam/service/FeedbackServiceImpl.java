package com.sunbeam.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.FeedbackDao;
import com.sunbeam.dao.ProductDao;
import com.sunbeam.entity.Feedback;
import com.sunbeam.entity.Product;

@Service
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	private FeedbackDao feedbackDao;

	@Autowired
	private ProductDao productDao;

	@Override
	public List<Feedback> getFeedbackForProduct(Long productId) {
		Product product = productDao.findById(productId).orElseThrow();
		return feedbackDao.findByProduct(product);
	}

	@Override
	public Feedback addFeedback(Long productId, Feedback feedback) {
		Product product = productDao.findById(productId).orElseThrow();
		feedback.setProduct(product);
		feedback.setCreatedAt(LocalDateTime.now());
		return feedbackDao.save(feedback);
	}

}
