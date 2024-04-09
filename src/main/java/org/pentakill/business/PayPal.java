package org.pentakill.business;

public class PayPal extends PayMethod{


    public PayPal(int customerId,String payeeName, String email) {
        super(customerId,payeeName);
        setPayMethodNumber(email);
        setPayMethodType("PAYPAL");
        setExpireDate("2999/12/31");
    }


    @Override
    public boolean validatePaymentDetails(String payDate) {
        return false;
    }

    @Override
    public boolean processPayment(double amount) {
        return false;
    }
}
