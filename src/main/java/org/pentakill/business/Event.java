package org.pentakill.business;

import java.util.Date;

public class Event {
    private int eventId;
    private String eventName;
    private String eventDate;
    private Date startTime;
    private Date endTime;
    private String address;
    private int totalTicket;
    private int ticketNum;

    private double tickectPrice;

    public Event(int eventId,String eventName,String eventDate,Date startTime,Date endTime,int totalTicket,double tickectPrice){
        setEventId(eventId);
        setEventName(eventName);
        setEventDate(eventDate);
        setStartTime(startTime);
        setEndTime(endTime);
        setTotalTicket(totalTicket);
        setTicketNum(totalTicket);
        setTickectPrice(tickectPrice);
    }
    public Event(int eventId,String eventName,String eventDate,Date startTime,Date endTime,String address,int totalTicket,int ticketNum, double tickectPrice){
        this(eventId,eventName,eventDate,startTime,endTime,totalTicket,tickectPrice);
        setAddress(address);
        setTicketNum(ticketNum);
    }
    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTotalTicket() {
        return totalTicket;
    }

    public void setTotalTicket(int totalTicket) {
        this.totalTicket = totalTicket;
    }

    public int getTicketNum() {
        return ticketNum;
    }

    public void setTicketNum(int ticketNum) {
        this.ticketNum = ticketNum;
    }

    public double getTickectPrice() {
        return tickectPrice;
    }

    public void setTickectPrice(double tickectPrice) {
        this.tickectPrice = tickectPrice;
    }

    @Override
    public String toString(){
        return "EventId:"+eventId+" EventDate:"+eventDate+" StartTime:"+startTime+" EndTime:"+endTime+" TotalTicket:"+totalTicket+" TickectPrice:"+tickectPrice;
    }

    @Override
    public boolean equals(Object obj){
        boolean result = false;
        if(obj instanceof Event){
            Event e = (Event)obj;
            result= e.toString().equals(this.toString());
        }
        return result;
    }
}
