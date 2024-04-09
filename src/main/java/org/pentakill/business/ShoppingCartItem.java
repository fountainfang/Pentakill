package org.pentakill.business;

public class ShoppingCartItem {
    private int eventId;
    private double ticketPrice;
    private int ticketNum;
    private boolean isSelected;

    public ShoppingCartItem() {
    }

    public ShoppingCartItem(int eventId, double ticketPrice, int ticketNum, boolean isSelected) {
        setEventId(eventId);
        setTicketPrice(ticketPrice);
        setTicketNum(ticketNum);
        setSelected(isSelected);
    }

    public int getEventId() {
        return eventId;
    }
    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public double getTicketPrice() {
        return ticketPrice;
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

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean isSelected) {
        this.isSelected = isSelected;
    }
}

