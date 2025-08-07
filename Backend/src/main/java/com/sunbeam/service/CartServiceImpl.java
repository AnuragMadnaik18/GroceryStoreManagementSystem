package com.sunbeam.service;

import com.sunbeam.dto.CartDto;
import com.sunbeam.entity.Cart;
import com.sunbeam.entity.Product;
import com.sunbeam.entity.User;

import jakarta.transaction.Transactional;

import com.sunbeam.dao.CartDao;
import com.sunbeam.dao.ProductDao;
import com.sunbeam.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;

    @Override
    public Cart addToCart(CartDto cartDto) {
        User user = userDao.findById(cartDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productDao.findById(cartDto.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setProductName(cartDto.getProductName());
        cart.setPrice(cartDto.getPrice());
        cart.setQuantity(cartDto.getQuantity());

        return cartDao.save(cart);
    }

    @Override
    public List<Cart> getCartByUserId(Long userId) {
        return cartDao.findByUserId(userId);
    }

    @Override
    public void deleteCartItem(Long userId, Long productId) {
        cartDao.deleteByUserIdAndProductId(userId, productId);
    }
}
