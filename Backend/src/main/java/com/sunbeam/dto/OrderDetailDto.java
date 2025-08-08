package com.sunbeam.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDto {
    private Long id;
    private Long orderId;
    private Long productId;
    private String productName;
    private int quantity;
    private double price;
}
