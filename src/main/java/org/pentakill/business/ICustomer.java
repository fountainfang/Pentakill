package org.pentakill.business;

public interface ICustomer {
    public int getCustomerId();

    public String getFirstName();

    public String getLastName();

    public String getEmail();

    public String getPhoneNum();

    public String getAddress();

    public String getCity();

    public String getProvince();

    public String getPostalCode();

    public String getCountry();

    public String getUserId();

    public String getPassword();

    public boolean saveTicketsToCart(Event event, int TicketNum);


}
