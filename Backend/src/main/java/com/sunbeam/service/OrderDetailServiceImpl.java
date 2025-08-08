package com.sunbeam.service;

import com.sunbeam.dao.*;
import com.sunbeam.dto.OrderDetailDto;
import com.sunbeam.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailDao orderDetailDao;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private ProductDao productDao;

    @Override
    public void addOrderDetails(List<OrderDetailDto> details) {
        List<OrderDetail> entities = details.stream().map(dto -> {
            Order order = orderDao.findById(dto.getOrderId()).orElseThrow();
            Product product = productDao.findById(dto.getProductId()).orElseThrow();

            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(product);
            //detail.setProductName(product.getName());
            detail.setQuantity(dto.getQuantity());
            detail.setPrice(dto.getPrice());

            return detail;
        }).collect(Collectors.toList());

        orderDetailDao.saveAll(entities);
    }

    @Override
    public List<OrderDetailDto> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailDao.findByOrderOrderId(orderId).stream()
                .map(od -> new OrderDetailDto(
                        od.getId(),
                        od.getOrder().getOrderId(),
                        od.getProduct().getId(),
                        od.getProduct().getName(),
                        od.getQuantity(),
                        od.getPrice()
                )).collect(Collectors.toList());
    }
}
