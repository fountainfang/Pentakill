package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class TestOrderEvent {
    static OrderEvent orderEvent;

    @BeforeEach
    public void initial() {
        orderEvent = new OrderEvent(1, 100, 9999.00);
    }

    @Test
    public void testGetOrderEvent() {
        assertEquals(1, orderEvent.getEventId());
        assertEquals(100, orderEvent.getTicketQuantity());
        assertEquals(9999.00, orderEvent.getSubTotalCost());
    }

    @Test
    public void testSetEventId() {
        orderEvent.setEventId(5);
        assertEquals(5, orderEvent.getEventId());
    }

    @Test
    public void testSetTicketQuantity() {
        orderEvent.setTicketQuantity(34);
        assertEquals(34, orderEvent.getTicketQuantity());
    }

    @Test
    public void testSetSubTotalCost() {
        orderEvent.setSubTotalCost(94.235);
        assertEquals(94.235, orderEvent.getSubTotalCost());
    }
}
