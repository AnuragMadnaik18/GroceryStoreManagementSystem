package com.sunbeam.controller;

import com.sunbeam.dto.CartDto;
import com.sunbeam.entity.Cart;
import com.sunbeam.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody CartDto cartDto) {
        try {
            return cartService.addToCart(cartDto);
        } catch (Exception e) {
            throw new RuntimeException("Error adding to cart: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @DeleteMapping("/remove/{userId}/{productId}")
    public String deleteCartItem(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            cartService.deleteCartItem(userId, productId);
            return "Product removed from cart successfully.";
        } catch (Exception e) {
            return "Failed to remove product: " + e.getMessage();
        }
    }
}
