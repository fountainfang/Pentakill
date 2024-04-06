package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;
import java.util.ArrayList;

public class TestOrder {
    static Order order;
    static List<OrderEvent> eventList;

    @BeforeEach
    public void initial() {
        OrderEvent event1 = new OrderEvent(1, 10, 50.00);
        OrderEvent event2 = new OrderEvent(2, 5, 35.00);
        eventList = new ArrayList<OrderEvent>();
        eventList.add(event1);
        eventList.add(event2);
        order = new Order(1, "2003-06-16", 1, 200.00, eventList);
    }

    @Test
    public void testGetOrder() {
        assertEquals(1, order.getOrderId());
        assertEquals("2003-06-16", order.getOrderDate());
        assertEquals(1, order.getCustomerId());
        assertEquals(200.00, order.getTotalAmount());
        assertEquals(eventList, order.getOrderEventList());
    }

    @Test
    public void testSetOrderId() {
        order.setOrderId(2);
        assertEquals(2, order.getOrderId());
    }

    @Test
    public void testSetOrderDate() {
        order.setOrderDate("2024-01-01");
        assertEquals("2024-01-01", order.getOrderDate());
    }

    @Test
    public void testSetCustomerId() {
        order.setCustomerId(90);
        assertEquals(90, order.getCustomerId());
    }

    @Test
    public void testSetTotalAmount() {
        order.setTotalAmount(1.37);
        assertEquals(1.37, order.getTotalAmount());
    }

    @Test
    public void testSetEventList() {
        OrderEvent event3 = new OrderEvent(3, 25, 512.00);
        OrderEvent event4 = new OrderEvent(4, 50, 333.00);
        eventList = new ArrayList<OrderEvent>();
        eventList.add(event3);
        eventList.add(event4);
        order.setOrderEventList(eventList);
        assertEquals(eventList, order.getOrderEventList());
    }
}
