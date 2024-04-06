package org.pentakill.business;

public class PaymentMethod {
    private int paymentId;
    private String cardType;
    private String cardNum;
    private String cardExpiryDate;

    public PaymentMethod(int paymentId, String cardType, String cardNum, String cardExpiryDate) {
        setPaymentId(paymentId);
        setCardType(cardType);
        setCardNum(cardNum);
        setCardExpiryDate(cardExpiryDate);
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardNum(String cardNum) {
        this.cardNum = cardNum;
    }

    public String getCardNum() {
        return cardNum;
    }

    public void setCardExpiryDate(String cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    public String getCardExpiryDate() {
        return cardExpiryDate;
    }
}
