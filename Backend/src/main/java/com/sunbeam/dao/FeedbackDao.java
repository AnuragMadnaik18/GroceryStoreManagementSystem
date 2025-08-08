package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.Feedback;
import com.sunbeam.entity.Product;
public interface FeedbackDao extends JpaRepository< Feedback,Long> {

	List<Feedback> findByProduct(Product product);
}
