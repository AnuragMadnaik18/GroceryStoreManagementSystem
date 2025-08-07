package com.sunbeam.service;

import com.sunbeam.dto.CartDto;
import com.sunbeam.entity.Cart;

import java.util.List;

public interface CartService {
    Cart addToCart(CartDto cartDto);
    List<Cart> getCartByUserId(Long userId);
    void deleteCartItem(Long userId, Long productId);
}
