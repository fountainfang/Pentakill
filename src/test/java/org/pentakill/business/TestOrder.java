package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class TestOrder {
    static Order order;

    @BeforeEach
    public void initial() {
        order = new Order(1, "2003-06-16", 1, 200.00);
    }

    @Test
    public void testGetOrder() {
        assertEquals(1, order.getOrderId());
        assertEquals("2003-06-16", order.getOrderDate());
        assertEquals(1, order.getCustomerId());
        assertEquals(200.00, order.getTotalAmount());
    }

    @Test
    public void testsetOrderId() {
        order.setOrderId(2);
        assertEquals(2, order.getOrderId());
    }

    @Test
    public void testsetOrderDate() {
        order.setOrderDate("2024-01-01");
        assertEquals("2024-01-01", order.getOrderDate());
    }

    @Test
    public void testsetCustomerId() {
        order.setCustomerId(90);
        assertEquals(90, order.getCustomerId());
    }

    @Test
    public void testsetTotalAmount() {
        order.setTotalAmount(1.37);
        assertEquals(1.37, order.getTotalAmount());
    }
}
