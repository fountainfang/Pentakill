package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;
import java.util.ArrayList;

public class AdminTest {
    static Admin admin;
    static List<Event> eventList;

    @BeforeEach
    public void initial() {
        Event event1 = new Event(1, "Event1", "2021-12-01", null, null, 100, 100.00);
        Event event2 = new Event(2, "Event2", "2023-09-13", null, null, 50, 300.00);
        eventList = new ArrayList<Event>();
        eventList.add(event1);
        eventList.add(event2);
        admin = new Admin(1, "warren2003", "#!12345", eventList);
    }

    @Test
    public void testGetAdmin() {
        assertEquals(1, admin.getAdminId());
        assertEquals("warren2003", admin.getUserName());
        assertEquals("#!12345", admin.getPassword());
        assertEquals(eventList, admin.getEventList());
    }

    @Test
    public void testSetAdminId() {
        admin.setAdminId(3);
        assertEquals(3, admin.getAdminId());
    }

    @Test
    public void testSetUserName() {
        admin.setUserName("Eric2003");
        assertEquals("Eric2003", admin.getUserName());
    }

    @Test
    public void testSetPassword() {
        admin.setPassword("45678*&");
        assertEquals("45678*&", admin.getPassword());
    }

    @Test
    public void testSetEventList() {
        Event event3 = new Event(3, "Event3", "2024-03-29", null, null, 1, 40.00);
        Event event4 = new Event(4, "Event4", "2024-01-01", null, null, 12, 12.00);
        eventList = new ArrayList<Event>();
        eventList.add(event3);
        eventList.add(event4);
        admin.setEventList(eventList);
        assertEquals(eventList, admin.getEventList());
    }

    @Test
    public void testVerifyExistedEvent() {
        Event event1 = new Event(1, "Event1", "2021-12-01", null, null, 100, 100.00);
        eventList = new ArrayList<Event>();
        eventList.add(event1);
        assertEquals(true, admin.verifyEvent(eventList, event1, true));
    }

    @Test
    public void testVerifyNonExistedEvent() {
        Event event3 = new Event(3, "Event3", "2024-03-29", null, null, 1, 40.00);
        assertEquals(false, admin.verifyEvent(eventList, event3, true));
    }
}