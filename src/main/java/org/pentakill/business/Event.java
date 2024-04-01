package org.pentakill.business;

public class Event {
    private int eventId;
    private String eventName;
    private String eventCategory;
    private String eventDesc;
    private String eventDate;
    private String startTime;
    private String endTime;
    private String address;
    private int totalTicket;
    private int ticketNum;

    private double ticketPrice;

    private int eventRating;

    public Event(){
    }

    public Event(int eventId, String eventName, String eventCategory, String eventDesc, String eventDate,
                 String startTime, String endTime, int totalTicket, double ticketPrice){
        setEventId(eventId);
        setEventName(eventName);
        setEventCategory(eventCategory);
        setEventDesc(eventDesc);
        setEventDate(eventDate);
        setStartTime(startTime);
        setEndTime(endTime);
        setTotalTicket(totalTicket);
        setTicketNum(totalTicket);
        setTicketPrice(ticketPrice);
        setEventRating(0);
    }
    public Event(int eventId, String eventName, String eventCategory, String eventDesc, String eventDate,
                 String startTime, String endTime, String address, int totalTicket, int ticketNum, double ticketPrice){
        this(eventId,eventName,eventCategory,eventDesc,eventDate,startTime,endTime,totalTicket,ticketPrice);
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

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
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

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    @Override
    public String toString(){
        return "EventId:"+eventId+" EventName:"+eventName+" EventCategory:"+eventCategory+" EventDate:"+eventDate+" StartTime:"+startTime+" EndTime:"+endTime+" TotalTicket:"+totalTicket+" TicketPrice:"+ticketPrice;
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

    public String getEventCategory() {
        return eventCategory;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public int getEventRating() {
        return eventRating;
    }

    public void setEventRating(int eventRating) {
        this.eventRating = eventRating;
    }

    public String getEventDesc() {
        return eventDesc;
    }

    public void setEventDesc(String eventDesc) {
        this.eventDesc = eventDesc;
    }
}
