package org.pentakill.business;

import java.util.List;

public class Customer {
    private int customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNum;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String userid;
    private String password;

    private ShoppingCart myCart;
    private List<PaymentMethod> paymentMethods;

    public Customer(int customerId, String firstName, String lastName, String email, String address, String city,
            String state, String postalCode, String country, String userid, String password) {
        setCustomerId(customerId);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setAddress(address);
        setCity(city);
        setState(state);
        setPostalCode(postalCode);
        setCountry(country);
        setUserid(userid);
        setPassword(password);
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean saveTicketsToCart(Event event, int TicketNum) {
        return false;
    }

    public boolean placeOrder() {
        return false;
    }

}
