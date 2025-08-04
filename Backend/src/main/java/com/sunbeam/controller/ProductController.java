package com.sunbeam.controller;


import com.sunbeam.entity.*;
import com.sunbeam.service.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")  // React app origin
public class ProductController {
 
 private final ProductServiceImpl productService;
 
 public ProductController(ProductServiceImpl service) {
     this.productService = service;
 }
 
 //List all products
 @GetMapping
 public List<Product> getProducts() {
     return productService.getAllProducts();
 }
 
 //Add products
 @PostMapping
 public ResponseEntity<?> createProduct(@RequestBody Product product) {
     return ResponseEntity.status(HttpStatus.CREATED).body(productService.saveProduct(product));
 }
 
//Update Product
 @PutMapping("/{id}")
 public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
     try {
         Product product = productService.updateProduct(id, updatedProduct);
         return ResponseEntity.ok(product);
     } catch (RuntimeException e) {
         return ResponseEntity.notFound().build();
     }
 }
 
 //Delete product
 @DeleteMapping("/{id}")
 public void deleteProduct(@PathVariable Long id) {
     productService.deleteProduct(id);
 }
 
 @GetMapping("/search/{name}")
 public ResponseEntity<List<Product>> searchProductByName(@PathVariable String name) {
     List<Product> results = productService.searchProductsByName(name);
     return ResponseEntity.ok(results);
 }

}



