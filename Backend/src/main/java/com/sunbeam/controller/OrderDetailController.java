package com.sunbeam.controller;

import com.sunbeam.dto.OrderDetailDto;
import com.sunbeam.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping
    public ResponseEntity<Void> addOrderDetails(@RequestBody List<OrderDetailDto> details) {
        orderDetailService.addOrderDetails(details);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderDetailDto>> getDetailsByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderDetailService.getOrderDetailsByOrderId(orderId));
    }
}
