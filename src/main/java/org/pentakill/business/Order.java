package org.pentakill.business;

public class Order {
    private int orderId;
    private String orderDate;
    private int customerId;
    private double totalAmount;

    public Order(int orderId, String orderDate, int customerId, double totalAmount) {
        setOrderId(orderId);
        setOrderDate(orderDate);
        setCustomerId(customerId);
        setTotalAmount(totalAmount);
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
}
