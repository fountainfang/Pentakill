package org.pentakill.business;

// import java.math.BigDecimal;

public class OrderEvent {
    private int eventId;
    private int ticketQuantity;
    private double subTotalCost;

    public OrderEvent(int eventId, int ticketQuantity, double subTotalCost) {
        setEventId(eventId);
        setTicketQuantity(ticketQuantity);
        setSubTotalCost(subTotalCost);
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setTicketQuantity(int ticketQuantity) {
        this.ticketQuantity = ticketQuantity;
    }

    public int getTicketQuantity() {
        return ticketQuantity;
    }

    public void setSubTotalCost(double subTotalCost) {
        this.subTotalCost = subTotalCost;
    }

    public double getSubTotalCost() {
        return subTotalCost;
    }
}
