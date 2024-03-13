package org.pentakill.business;

import java.util.Date;

public class PaymentMethod {
    private int paymentId;
    private String cardType;
    private int cardNum;
    private Date cardExpiryDate;

    public PaymentMethod(int paymentId, String cardType, int cardNum, Date cardExpiryDate) {
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

    public void setCardNum(int cardNum) {
        this.cardNum = cardNum;
    }

    public int getCardNum() {
        return cardNum;
    }

    public void setCardExpiryDate(Date cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    public Date getCardExpiryDate() {
        return cardExpiryDate;
    }
}
