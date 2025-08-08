package com.sunbeam.service;

import com.sunbeam.dto.OrderDetailDto;
import java.util.List;

public interface OrderDetailService {
    void addOrderDetails(List<OrderDetailDto> details);
    List<OrderDetailDto> getOrderDetailsByOrderId(Long orderId);
}
