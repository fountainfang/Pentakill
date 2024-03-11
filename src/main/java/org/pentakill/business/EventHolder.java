package org.pentakill.business;

import java.util.ArrayList;
import java.util.List;

public class EventHolder extends Customer{
    private boolean isEventHolder ;
    private List<Event> eventList;

    public EventHolder(){
        super();
        setEventHolder(true);
        setEventList(new ArrayList<Event>());
    }
    public EventHolder(int customerId, String firstName, String lastName, String email, String address, String city, String state, String postalCode, String country, String userid, String password){
        super(customerId, firstName, lastName, email, address, city, state, postalCode, country, userid, password);
        setEventHolder(true);
        setEventList(new ArrayList<Event>());
    }

    public boolean isEventHolder() {
        return isEventHolder;
    }

    public void setEventHolder(boolean eventHolder) {
        isEventHolder = eventHolder;
    }

    public List<Event> getEventList() {
        return eventList;
    }

    public void setEventList(List<Event> eventList) {
        this.eventList = eventList;
    }

    public boolean issueNewEvent(Event event){
        boolean result = false;
        boolean newEvent = !EventRegistry.getInstance().containsEvent(event);
        if(newEvent){
            result = EventRegistry.getInstance().addEvent(event);
        }
        return result;
    }

    public boolean cancelEvent(Event event){
        boolean result = false;
        boolean existingEvent = EventRegistry.getInstance().containsEvent(event);
        if(existingEvent){
            result = EventRegistry.getInstance().deleteEvent(event);
        }
        return result;
    }
}