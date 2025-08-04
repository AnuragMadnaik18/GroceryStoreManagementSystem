package com.sunbeam.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.*;

public interface ProductDao extends JpaRepository<Product, Long> {
	List<Product> findAll();
	List<Product> findByNameContainingIgnoreCase(String name);
}
