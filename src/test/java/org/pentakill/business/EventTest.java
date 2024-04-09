package org.pentakill.business;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Date;

public class EventTest {

    public static Event event;
    @BeforeEach
    public void init() {
        event = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
    }

    @Test
    public void testEvent() {
        assertEquals(1, event.getEventId());
        assertEquals("Event1", event.getEventName());
        assertEquals("2021-12-01", event.getEventDate());
        assertEquals(100, event.getTotalTicket());
        assertEquals(100, event.getTicketNum());
        assertEquals(10.0, event.getTicketPrice());
    }

    @Test
    public void testToString() {
        String entStr = "EventId:1 EventName:Event1 EventCategory: EventDate:2021-12-01 StartTime:10:00:00 EndTime:12:00:00 TotalTicket:100 TicketPrice:10.0";
        assertEquals(entStr, event.toString());
    }

    @Test
    public void testSetEventId() {
        event.setEventId(2);
        assertEquals(2, event.getEventId());
    }

    @Test
    public void testSetEventName() {
        event.setEventName("Event2");
        assertEquals("Event2", event.getEventName());
    }

    @Test
    public void  testEquals() {
        Event event2 = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        assertTrue(event.equals(event2));
    }

    @Test
    public void testSetEventDate() {
        event.setEventDate("2022-01-01");
        assertEquals("2022-01-01", event.getEventDate());
    }

    @Test
    public void testSetStartTime() {
        String startTime = "10:00:00";
        event.setStartTime(startTime);
        assertEquals(startTime, event.getStartTime());
    }

    @Test
    public void testSetEndTime() {
        String endTime = "12:00:00";
        event.setEndTime(endTime);
        assertEquals(endTime, event.getEndTime());
    }

    @Test
    public void testSetAddress() {
        event.setAddress("New Address");
        assertEquals("New Address", event.getAddress());
    }

    @Test
    public void testSetTotalTicket() {
        event.setTotalTicket(200);
        assertEquals(200, event.getTotalTicket());
    }

    @Test
    public void testSetTicketNum() {
        event.setTicketNum(50);
        assertEquals(50, event.getTicketNum());
    }
}
