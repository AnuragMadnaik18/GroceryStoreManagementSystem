package com.sunbeam.dto;

import com.sunbeam.entity.OrderStatus;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long orderId;
    private LocalDate orderDate;
    private OrderStatus status;
    private double totalPrice;
    private Long userId;
    private String userName;
}
