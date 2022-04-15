package com.study.ecommerce.dto;

import com.study.ecommerce.entity.Address;
import com.study.ecommerce.entity.Customer;
import com.study.ecommerce.entity.Order;
import com.study.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
