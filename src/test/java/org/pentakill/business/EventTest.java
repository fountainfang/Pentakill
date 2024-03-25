package org.pentakill.business;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Date;

public class EventTest {
    @Test
    public void testEvent() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, "",100,100, 10.0);
        assertEquals(1, event.getEventId());
        assertEquals("Event1", event.getEventName());
        assertEquals("2021-12-01", event.getEventDate());
        assertEquals(100, event.getTotalTicket());
        assertEquals(100, event.getTicketNum());
        assertEquals(10.0, event.getTicketPrice());
    }

    @Test
    public void testToString() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        String entStr = "EventId:1 EventDate:2021-12-01 StartTime:null EndTime:null TotalTicket:100 TicketPrice:10.0";
        assertEquals(entStr, event.toString());
    }

    @Test
    public void testSetEventId() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setEventId(2);
        assertEquals(2, event.getEventId());
    }

    @Test
    public void testSetEventName() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setEventName("Event2");
        assertEquals("Event2", event.getEventName());
    }

    @Test
    public void  testEquals() {
        Event event1 = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        Event event2 = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        assertTrue(event1.equals(event2));
    }

    @Test
    public void testSetEventDate() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setEventDate("2022-01-01");
        assertEquals("2022-01-01", event.getEventDate());
    }

    @Test
    public void testSetStartTime() {
        Date startTime = new Date();
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setStartTime(startTime);
        assertEquals(startTime, event.getStartTime());
    }

    @Test
    public void testSetEndTime() {
        Date endTime = new Date();
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setEndTime(endTime);
        assertEquals(endTime, event.getEndTime());
    }

    @Test
    public void testSetAddress() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setAddress("New Address");
        assertEquals("New Address", event.getAddress());
    }

    @Test
    public void testSetTotalTicket() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setTotalTicket(200);
        assertEquals(200, event.getTotalTicket());
    }

    @Test
    public void testSetTicketNum() {
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        event.setTicketNum(50);
        assertEquals(50, event.getTicketNum());
    }
}
