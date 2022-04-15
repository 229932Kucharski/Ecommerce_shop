package com.study.ecommerce.service;

import com.study.ecommerce.dto.Purchase;
import com.study.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
