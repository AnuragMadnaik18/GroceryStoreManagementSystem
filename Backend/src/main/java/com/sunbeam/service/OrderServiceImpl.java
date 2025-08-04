package com.sunbeam.service;

import com.sunbeam.dao.OrderDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.OrderDto;
import com.sunbeam.entity.Order;
import com.sunbeam.entity.OrderStatus;
import com.sunbeam.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderRepository;

    @Autowired
    private UserDao userRepository;

    @Override
    public OrderDto addOrder(OrderDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setOrderDate(dto.getOrderDate() != null ? dto.getOrderDate() : LocalDate.now());
        order.setStatus(dto.getStatus() != null ? dto.getStatus() : OrderStatus.PENDING);
        order.setTotalPrice(dto.getTotalPrice());
        order.setUser(user);

        Order savedOrder = orderRepository.save(order);

        return mapToDto(savedOrder);
    }

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
    
    @Override
    public OrderDto updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(OrderStatus.valueOf(status.toUpperCase())); // Validate enum
        Order updatedOrder = orderRepository.save(order);

        return mapToDto(updatedOrder);
    }
    
    

    private OrderDto mapToDto(Order order) {
        return new OrderDto(
                order.getOrderId(),
                order.getOrderDate(),
                order.getStatus(),
                order.getTotalPrice(),
                order.getUser().getId(),
                order.getUser().getFullName()
        );
    }
}
