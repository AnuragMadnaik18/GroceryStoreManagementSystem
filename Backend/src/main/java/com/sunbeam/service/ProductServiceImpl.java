package com.sunbeam.service;

import com.sunbeam.dao.ProductDao;
import com.sunbeam.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product updated) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existing = optionalProduct.get();
            existing.setName(updated.getName());
            existing.setCategory(updated.getCategory());
            existing.setDescription(updated.getDescription());
            existing.setPrice(updated.getPrice());
            existing.setStock(updated.getStock());
            existing.setImage(updated.getImage());
            return productRepository.save(existing);
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    @Override
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

}
