package org.pentakill.business;

public abstract class PayMethod {
    private int payMethodId;
    private String payeeName;
    private int customerId;
    private String payMethodType;
    private String payMethodNumber;
    private String expireDate;

    public PayMethod(int customerId,String payeeName) {
        this.setCustomerId(customerId);
        this.setPayeeName(payeeName);
    }

    public abstract boolean validatePaymentDetails(String payDate);
    public abstract boolean processPayment(double amount);

    public int getPayMethodId() {
        return payMethodId;
    }

    public void setPayMethodId(int payMethodId) {
        this.payMethodId = payMethodId;
    }

    public String getPayeeName() {
        return payeeName;
    }

    public void setPayeeName(String payeeName) {
        this.payeeName = payeeName;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getPayMethodType() {
        return payMethodType;
    }

    public void setPayMethodType(String payMethodType) {
        this.payMethodType = payMethodType;
    }

    public String getPayMethodNumber() {
        return payMethodNumber;
    }

    public void setPayMethodNumber(String payMethodNumber) {
        this.payMethodNumber = payMethodNumber;
    }

    public String getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }
}
