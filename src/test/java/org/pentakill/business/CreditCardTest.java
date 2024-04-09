package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class CreditCardTest {

    @Test
    public void creditCardValidatesCorrectDetails() {
        CreditCard creditCard = new CreditCard(1, 1, "John Doe", "1234567890", "Visa", "2025/12/31");
        assertTrue(creditCard.validatePaymentDetails("2022/12/31"));
    }

    @Test
    public void creditCardRejectsInvalidCardNumber() {
        CreditCard creditCard = new CreditCard(1, 1, "John Doe", "123", "Visa", "2025/12/31");
        assertFalse(creditCard.validatePaymentDetails("2022/12/31"));
    }

    @Test
    public void creditCardRejectsInvalidCardType() {
        CreditCard creditCard = new CreditCard(1, 1, "John Doe", "1234567890", "InvalidType", "2025/12/31");
        assertFalse(creditCard.validatePaymentDetails("2022/12/31"));
    }

    @Test
    public void creditCardRejectsExpiredCard() {
        CreditCard creditCard = new CreditCard(1, 1, "John Doe", "1234567890", "Visa", "2020/12/31");
        assertFalse(creditCard.validatePaymentDetails("2022/12/31"));
    }
}
