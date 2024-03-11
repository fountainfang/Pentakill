package org.pentakill.business;

import java.util.Date;
import java.util.List;

public class Order {
    private int orderId;
    private Date orderDate;
    private List<OrderEvent> orderEvents;
    private Customer customer;
    private double totalAmount;

    public Order(int orderId, Date orderDate, List<OrderEvent> orderEvents, Customer customer, double totalAmount) {
        setOrderId(orderId);
        setOrderDate(orderDate);
        setOrderEvent(orderEvents);
        setCustomer(customer);
        setTotalAmount(totalAmount);
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderEvent(List<OrderEvent> orderEvents) {
        this.orderEvents = orderEvents;
    }

    public List<OrderEvent> getOrderEvent() {
        return orderEvents;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getAmount() {
        return totalAmount;
    }
}
