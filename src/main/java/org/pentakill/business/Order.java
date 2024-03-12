package org.pentakill.business;

import java.util.Date;
import java.util.List;

public class Order {
    private int orderId;

    private Date orderDate;
    private List<OrderEvent> orderEvents;
    private Customer customer;
    private double totalAmount;
}
