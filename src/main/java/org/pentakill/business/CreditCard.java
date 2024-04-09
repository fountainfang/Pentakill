package org.pentakill.business;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CreditCard extends PayMethod{

    //Use the @JsonCreator annotation to mark this constructor for JSON deserialization
    @JsonCreator
    public CreditCard(@JsonProperty("payMethodId") int payMethodId,
                      @JsonProperty("customerId") int customerId,
                      @JsonProperty("payeeName") String payeeName,
                      @JsonProperty("payMethodNumber") String cardNumber,
                      @JsonProperty("payMethodType") String cardType,
                      @JsonProperty("expireDate") String expDate) {
        super(customerId,payeeName);
        setPayMethodId(payMethodId);
        setPayMethodNumber(cardNumber);
        setPayMethodType(cardType);
        setExpireDate(expDate);
    }

    @Override
    public boolean validatePaymentDetails(String payDate){
        boolean result = false;
        boolean validCardNumber = false;
        boolean validExpDate = false;
        boolean validCardType = false;
        if(getPayMethodNumber().length() >= 10){
            validCardNumber = true;
        }
        if(getPayMethodType().equalsIgnoreCase("Visa") || getPayMethodType().equalsIgnoreCase("MasterCard") || getPayMethodType().equalsIgnoreCase("American Express")){
            validCardType = true;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
            Date expDate = sdf.parse(getExpireDate());
            Date pDate = sdf.parse(payDate);
            if (expDate.after(pDate))
                validExpDate = true;
        }catch (Exception e){
            e.printStackTrace();
        }
        result = validCardNumber && validCardType && validExpDate ;
        return result;
    }

    @Override
    public boolean processPayment(double amount) {
        //todo implement the payment process
        return true;
    }
}
