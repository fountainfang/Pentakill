package org.pentakill.business;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;



public class EventRegistryTest {

    static EventRegistry eventRegistry ;
    @BeforeAll
    public static void init() {
        eventRegistry = EventRegistry.getInstance();
    }

    @Test
    public void testAddEvent() throws ParseException {
        Event event1 = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        Event event2 = new Event(2, "Event2", "","","2021-12-01", "11:00:00","13:00:00", 100, 10.0);
        assertTrue(eventRegistry.addEvent(event1));
        assertFalse(eventRegistry.addEvent(event2));
    }

    @Test
    public void testGetInstance() {
        EventRegistry eventRegistry2 = EventRegistry.getInstance();
        assertEquals(eventRegistry, eventRegistry2);
    }

    @Test
    public void testDeleteEvent() throws ParseException {
        Event event1 = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        eventRegistry.addEvent(event1);
        assertTrue(eventRegistry.deleteEvent(event1));
        assertFalse(eventRegistry.deleteEvent(event1));
    }

    @Test
    public void  testContainsEvent() throws ParseException {
        Event event1 = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        eventRegistry.addEvent(event1);
        assertTrue(eventRegistry.containsEvent(event1));
    }

    @Test
    public void testGetAvailableEvents() throws ParseException {
        Event event1 = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        Event event2 = new Event(1, "Event1", "","","2021-12-01", "11:00:00","13:00:00", 100, 10.0);
        eventRegistry.addEvent(event1);
        eventRegistry.addEvent(event2);
        assertEquals(1, eventRegistry.getAvailableEvents().size());
    }

    @Test
    public void testTimeOverlap() throws ParseException {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Time startTime1 = dateFormat.parse("2021-12-01 10:00:00");
//        Date endTime1 = dateFormat.parse("2021-12-01 12:00:00");
//        Date startTime2 = dateFormat.parse("2021-12-01 10:00:00");
//        Date endTime2 = dateFormat.parse("2021-12-01 12:00:00");
//        Date startTime3 = dateFormat.parse("2021-12-01 09:00:00");
//        Date endTime3 = dateFormat.parse("2021-12-01 13:00:00");
//        Date startTime4 = dateFormat.parse("2021-12-01 09:00:00");
//        Date endTime4 = dateFormat.parse("2021-12-01 11:00:00");
//        Date startTime5 = dateFormat.parse("2021-12-01 10:30:00");
//        Date endTime5 = dateFormat.parse("2021-12-01 11:30:00");
//        Date startTime6 = dateFormat.parse("2021-12-02 11:00:00");
//        Date endTime6 = dateFormat.parse("2021-12-02 13:00:00");
        Event event1 = new Event(1, "Event1", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        Event event2 = new Event(2, "Event2", "","","2021-12-01", "10:00:00","12:00:00", 100, 10.0);
        Event event3 = new Event(3, "Event3", "","","2021-12-01", "09:00:00","13:00:00", 100, 10.0);
        Event event4 = new Event(4, "Event4", "","","2021-12-01", "09:00:00","11:00:00", 100, 10.0);
        Event event5 = new Event(5, "Event5", "","","2021-12-01", "10:30:00","11:30:00", 100, 10.0);
        Event event6 = new Event(6, "Event6", "","","2021-12-02", "11:00:00","13:00:00", 100, 10.0);

        eventRegistry.addEvent(event1);
        assertTrue(eventRegistry.checkTimeOverlap(event2));
        assertTrue(eventRegistry.checkTimeOverlap(event3));
        assertTrue(eventRegistry.checkTimeOverlap(event4));
        assertTrue(eventRegistry.checkTimeOverlap(event5));
        assertFalse(eventRegistry.checkTimeOverlap(event6));
    }

    @BeforeEach
    public void tearDown() {
        eventRegistry.clearAll();
    }
}
