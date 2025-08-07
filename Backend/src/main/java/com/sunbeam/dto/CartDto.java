package com.sunbeam.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long userId;
    private Long productId;
    private String productName;
    private double price;
    private int quantity;
}
