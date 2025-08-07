package com.sunbeam.dao;

import com.sunbeam.entity.Cart;
import com.sunbeam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartDao extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
