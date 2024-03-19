package org.pentakill.business;

public interface ICustomer {
    int getCustomerId();

    String getFirstName();

    String getLastName();

    String getEmail();

    String getPhoneNum();

    String getAddress();

    String getCity();

    String getState();

    String getPostalCode();

    String getCountry();

    String getUserid();

    String getPassword();

    boolean saveTicketsToCart(Event event, int TicketNum);

    boolean placeOrder();
}
