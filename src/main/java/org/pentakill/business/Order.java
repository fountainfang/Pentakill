package org.pentakill.business;

import java.util.List;

public class Order {
    private int orderId;
    private String orderDate;
    private int customerId;
    private double totalAmount;
    private List<OrderEvent> orderEvent;

    public Order(int orderId, String orderDate, int customerId, double totalAmount, List<OrderEvent> orderEvent) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.orderEvent = orderEvent;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setOrderEventList(List<OrderEvent> orderEvent) {
        this.orderEvent = orderEvent;
    }

    public List<OrderEvent> getOrderEventList() {
        return orderEvent;
    }
}
