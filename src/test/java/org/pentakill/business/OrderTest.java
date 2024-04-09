package org.pentakill.business;

import org.junit.jupiter.api.*;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.*;

public class OrderTest {

    public static Order order;
    @BeforeEach
    public void init() {
        order = new Order(1, "2024-04-01", 100.0, "abc@gmail.com", "1234567890", null, 1, 1);
    }

    @Test
    public void testOrder() {
        assertEquals(1, order.getOrderId());
        assertEquals("2024-04-01", order.getOrderDate());
        assertEquals(100.0, order.getTotalAmount());
        assertEquals("abc@gmail.com", order.getEmail());
        assertEquals("1234567890", order.getPhonenum());
        assertEquals(1, order.getCustomerId());
        assertEquals(1, order.getPayMethodId());
    }

    @Test
    public void testSetOrderId() {
        order.setOrderId(2);
        assertEquals(2, order.getOrderId());
    }

    @Test
    public void testSetOrderDate() {
        order.setOrderDate("2024-04-02");
        assertEquals("2024-04-02", order.getOrderDate());
    }

    @Test
    public void testSetTotalAmount() {
        order.setTotalAmount(200.0);
        assertEquals(200.0, order.getTotalAmount());
    }

    @Test
    public void testSetEmail() {
        order.setEmail("eric@gmail.com");
        assertEquals("eric@gmail.com", order.getEmail());
    }

    @Test
    public void testSetPhonenum() {
        order.setPhonenum("0987654321");
        assertEquals("0987654321", order.getPhonenum());
    }

    @Test
    public void testSetCustomerId() {
        order.setCustomerId(2);
        assertEquals(2, order.getCustomerId());
    }

    @Test
    public void testSetPayMethodId() {
        order.setPayMethodId(2);
        assertEquals(2, order.getPayMethodId());
    }

    @Test
    public void testSetOrderEvents() {
        OrderEvent orderEvent = new OrderEvent(1, 1, 100.0, 1);
        ArrayList<OrderEvent> orderEvents = new ArrayList<>();
        orderEvents.add(orderEvent);
        order.setOrderEvents(orderEvents);
        assertEquals(orderEvent, order.getOrderEvents().get(0));
    }


}
