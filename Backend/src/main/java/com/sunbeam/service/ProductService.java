package com.sunbeam.service;

import com.sunbeam.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product saveProduct(Product product);
    Product updateProduct(Long id, Product updated);
    void deleteProduct(Long id);
    List<Product> searchProductsByName(String name);
}
