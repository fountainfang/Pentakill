package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;



public class OrderEventTest {

    public static OrderEvent orderEvent;
    @BeforeEach
    public void init() {
        orderEvent = new OrderEvent(1, 1, 100.0,  1);
    }

    @Test
    public void testOrderEvent() {
        assertEquals(1, orderEvent.getOrderId());
        assertEquals(1, orderEvent.getEventId());
        assertEquals(100.0, orderEvent.getTicketPrice());
        assertEquals(1, orderEvent.getTicketNum());
    }

    @Test
    public void testSetOrderId() {
        orderEvent.setOrderId(2);
        assertEquals(2, orderEvent.getOrderId());
    }

    @Test
    public void testSetEventId() {
        orderEvent.setEventId(2);
        assertEquals(2, orderEvent.getEventId());
    }

    @Test
    public void testSetTicketPrice() {
        orderEvent.setTicketPrice(200.0);
        assertEquals(200.0, orderEvent.getTicketPrice());
    }

    @Test
    public void testSetTicketNum() {
        orderEvent.setTicketNum(2);
        assertEquals(2, orderEvent.getTicketNum());
    }

    @Test
    public void testSetOrderIdAndEventId() {
        orderEvent.setOrderId(2);
        orderEvent.setEventId(2);
        assertEquals(2, orderEvent.getOrderId());
        assertEquals(2, orderEvent.getEventId());
    }

}
