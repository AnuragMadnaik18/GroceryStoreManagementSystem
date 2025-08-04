package com.sunbeam.service;

import com.sunbeam.dto.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto addOrder(OrderDto orderDto);
    List<OrderDto> getAllOrders();
    void deleteOrder(Long orderId);
    OrderDto updateOrderStatus(Long orderId, String status);
}
