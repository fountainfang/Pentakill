package org.pentakill.business;

import java.util.List;

public class Customer implements ICustomer {
    private int customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNum;
    private String address;
    private String city;
    private String province;
    private String postalCode;
    private String country;
    private String userId;
    private String password;

    private ShoppingCart myCart;
    private List<PayMethod> payMethods;

    public Customer() {
    }
    public Customer(int customerId, String firstName, String lastName, String email, String phoNum, String address, String city, String province, String postalCode, String country, String userId, String password) {
        setCustomerId(customerId);
        setFirstName(firstName);
        setLastName(lastName);
        setPhoneNum(phoNum);
        setEmail(email);
        setAddress(address);
        setCity(city);
        setProvince(province);
        setPostalCode(postalCode);
        setCountry(country);
        setUserId(userId);
        setPassword(password);
        myCart = new ShoppingCart(customerId);
    }


    @Override
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    @Override
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    @Override
    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ShoppingCart getShoppingCart() {
        return myCart;
    }

    public void setShoppingCart(ShoppingCart myCart) {
        this.myCart = myCart;
    }

    public List<PayMethod> getPayMethods() {
        return payMethods;
    }

    public boolean addPayMethod(PayMethod payMethod) {
        return payMethods.add(payMethod);
    }
    @Override
    public boolean saveTicketsToCart(Event event, int TicketNum){
        boolean result = false;
        myCart.addShoppingCartItem(event.getEventId(), event.getTicketPrice(), TicketNum, true);
        return result;
    }

}
