package org.pentakill.business;
import org.junit.jupiter.api.*;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
public class EventHolderTest {

    static EventHolder eventHolder;
    @BeforeEach
    public void init() {
        eventHolder = new EventHolder(1, "Tom", "Chen", "abc@gmail.com", "123456", "AAA Way", "kelowna", "BC", "V1V3C9", "CA",
                                   "Tom", "123");
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
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        ArrayList<Event> newList = new ArrayList<>();
        newList.add(event);
        eventHolder.setEventList(newList);
        assertEquals(1,eventHolder.getEventList().size());
    }

    @Test
    public void testIssueNewEvent(){
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        assertTrue(eventHolder.issueNewEvent(event));
        assertFalse(eventHolder.issueNewEvent(event));
    }

    @Test
    public void testCancelEvent(){
        Event event = new Event(1, "Event1", "2021-12-01", null, null, 100, 10.0);
        eventHolder.issueNewEvent(event);
        assertTrue(eventHolder.cancelEvent(event));
        assertFalse(eventHolder.cancelEvent(event));
    }

}
