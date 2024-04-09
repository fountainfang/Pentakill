package org.pentakill.business;

public class OrderEvent {

    private int orderId;
    private int eventId;
    private double ticketPrice;
    private int ticketNum;

    public OrderEvent(int orderId, int eventId, double ticketPrice, int ticketNum) {
        this.setOrderId(orderId);
        this.setEventId(eventId);
        this.setTicketPrice(ticketPrice);
        this.setTicketNum(ticketNum);
    }



    public int getEventId() {
        return eventId;
    }


    public double getTicketPrice() {
        return ticketPrice;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public int getTicketNum() {
        return ticketNum;
    }

    public void setTicketNum(int ticketNum) {
        this.ticketNum = ticketNum;
    }
}
