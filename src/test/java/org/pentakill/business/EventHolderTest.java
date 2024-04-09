package org.pentakill.business;
import org.junit.jupiter.api.*;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
public class EventHolderTest {

    static EventHolder eventHolder;
    static Event event;
    @BeforeEach
    public void init() {
        eventHolder = new EventHolder(1, "Tom", "Chen", "abc@gmail.com", "123456", "AAA Way", "kelowna", "BC", "V1V3C9", "CA",
                                   "Tom", "123");
        event = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        EventRegistry.getInstance().clearAll();
    }

    @Test
    public void testEventHolder() {
        assertEquals(1, eventHolder.getCustomerId());
        assertEquals("Tom", eventHolder.getFirstName());
        assertEquals("Chen", eventHolder.getLastName());
        assertEquals("123456", eventHolder.getPhoneNum());
    }

    @Test
    public void testSetEventHolder(){
        assertTrue(eventHolder.isEventHolder());
        eventHolder.setEventHolder(false);
        assertFalse(eventHolder.isEventHolder());
    }

    @Test
    public void testEventList(){
        assertEquals(0, eventHolder.getEventList().size());
        ArrayList<Event> newList = new ArrayList<>();
        newList.add(event);
        eventHolder.setEventList(newList);
        assertEquals(1,eventHolder.getEventList().size());
    }

    @Test
    public void testIssueNewEvent(){
        assertTrue(eventHolder.issueNewEvent(event));
        assertFalse(eventHolder.issueNewEvent(event));
    }

    @Test
    public void testCancelEvent(){
        eventHolder.issueNewEvent(event);
        assertTrue(eventHolder.cancelEvent(event));
        assertFalse(eventHolder.cancelEvent(event));
    }

}
