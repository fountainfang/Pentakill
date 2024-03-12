package org.pentakill.business;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class EventRegistry {

    private static EventRegistry eventRegistry;
    private List<Event> eventsList;
    private EventRegistry() {
        eventsList = new ArrayList<Event>();
    };

    public static EventRegistry getInstance(){
        if(eventRegistry == null){
            eventRegistry = new EventRegistry();
        }
        return eventRegistry;
    }


    public boolean addEvent(Event event){
        boolean result = false;
        boolean timeOverlap = checkTimeOverlap(event);
        if(!timeOverlap){
            eventsList.add(event);
            result = true;
        }
        return result;
    }

    public boolean deleteEvent(Event event){
        boolean result = false;
        if(eventsList.contains(event)){
            eventsList.remove(event);
            result = true;
        }
        return result;
    }

    public void clearAll(){
        eventsList.clear();
    }

    public List<Event> getAvailableEvents(){
        return getAvailableEvents("1970-01-01","2999-12-31");
    }

    // the input parameter format is "yyyy-MM-dd"
    public List<Event> getAvailableEvents(String fromDateTime, String toDateTime){
        Date fromDate = Date.valueOf(fromDateTime);
        Date toDate = Date.valueOf(toDateTime);
        List<Event> availableEvents = null;
        for(Event e: eventsList){
            if(e.getTicketNum() > 0 ){
                Date eventDate = Date.valueOf(e.getEventDate());
                if(eventDate.after(fromDate) && eventDate.before(toDate)) {
                    if (availableEvents == null)
                        availableEvents = new ArrayList<Event>();
                    availableEvents.add(e);
                }
            }
        }
        return availableEvents;
    }

    public boolean containsEvent(Event event){
        return eventsList.contains(event);
    }

    public boolean checkTimeOverlap(Event event){
        boolean result = false;
        if(!eventsList.isEmpty()) {
            for (Event e : eventsList) {
                if (e.getEventDate().equals(event.getEventDate())) {
                    //e:10:00-12:00  event:10:00-12:00
                    if (e.getStartTime().equals(event.getStartTime()) || e.getEndTime().equals(event.getEndTime())) {
                        result = true;
                        break;
                    }
                    //e:10:00-12:00  event:09:00-13:00
                    else if (e.getStartTime().after(event.getStartTime()) && e.getEndTime().before(event.getEndTime()) ) {
                        result = true;
                        break;
                    }
                    //e:10:00-12:00  event:09:00-11:00
                    else if (e.getStartTime().after(event.getStartTime()) && e.getStartTime().before(event.getEndTime()) ) {
                        result = true;
                        break;
                    }
                    //e:10:00-12:00  event:10:30-11:30 or event:10:30-12:30
                    else if (e.getStartTime().before(event.getStartTime()) && e.getEndTime().after(event.getStartTime())) {
                        result = true;
                        break;
                    }
                }
            }
        }
        return result;
    }
}
