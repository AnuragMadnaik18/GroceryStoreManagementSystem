package com.sunbeam.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id; 

 private String name;
 
 private String description;
 
 private double price;
 
 private int stock;
 
// @Enumerated(EnumType.STRING)
 private Category category;
 
 private String image;
 
 private LocalDateTime createdAt= LocalDateTime.now();
 
 @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
 @JsonIgnore
 private List<OrderDetail> orderDetails;

 
}

