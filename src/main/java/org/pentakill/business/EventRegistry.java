package org.pentakill.business;

import java.util.List;

public class EventRegistry {

    private static EventRegistry eventRegistry;
    private EventRegistry() {
    };

    public static EventRegistry getInstance(){
        if(eventRegistry == null){
            eventRegistry = new EventRegistry();
        }
        return eventRegistry;
    }

    private List<Event> eventsList;
    public boolean addEvent(Event event){
        return false;
    }

    public boolean deleteEvent(Event event){
        return false;
    }

    public List<Event> getAvailableEvents(){
        return null;
    }

    public boolean containsEvent(Event event){
        return false;
    }
}
