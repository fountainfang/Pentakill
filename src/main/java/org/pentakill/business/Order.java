package org.pentakill.business;

import java.util.List;

public class Order {
    private int orderId;
    private String orderDate;
    private double totalAmount;
    private String email;
    private String phonenum;
    private List<OrderEvent> orderEvents;
    private int customerId;
    private int payMethodId;

    public Order() {
    }

    public Order(int orderId, String orderDate, double totalAmount, String email, String phonenum, List<OrderEvent> orderEvents, int customerId, int payMethodId) {
        this.setOrderId(orderId);
        this.setOrderDate(orderDate);
        this.setTotalAmount(totalAmount);
        this.setEmail(email);
        this.setPhonenum(phonenum);
        this.setOrderEvents(orderEvents);
        this.setCustomerId(customerId);
        this.setPayMethodId(payMethodId);
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenum() {
        return phonenum;
    }

    public void setPhonenum(String phonenum) {
        this.phonenum = phonenum;
    }

    public List<OrderEvent> getOrderEvents() {
        return orderEvents;
    }

    public void setOrderEvents(List<OrderEvent> orderEvents) {
        this.orderEvents = orderEvents;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getPayMethodId() {
        return payMethodId;
    }

    public void setPayMethodId(int payMethodId) {
        this.payMethodId = payMethodId;
    }
}
