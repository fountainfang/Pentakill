package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class TestPaymentMethod {
    static PaymentMethod paymentMethod;

    @BeforeEach
    public void initial() {
        paymentMethod = new PaymentMethod(1, "MasterCard", "1234 5678 9012 3456", "01/24");
    }

    @Test
    public void testGetPaymentMethod() {
        assertEquals(1, paymentMethod.getPaymentId());
        assertEquals("MasterCard", paymentMethod.getCardType());
        assertEquals("1234 5678 9012 3456", paymentMethod.getCardNum());
        assertEquals("01/24", paymentMethod.getCardExpiryDate());
    }

    @Test
    public void testSetPaymentId() {
        paymentMethod.setPaymentId(6);
        assertEquals(6, paymentMethod.getPaymentId());
    }

    @Test
    public void testSetCardType() {
        paymentMethod.setCardType("Visa");
        assertEquals("Visa", paymentMethod.getCardType());
    }

    @Test
    public void testSetCardNum() {
        paymentMethod.setCardNum("3215 5563 4266 6411");
        assertEquals("3215 5563 4266 6411", paymentMethod.getCardNum());
    }

    @Test
    public void testSetCardExpiryDate() {
        paymentMethod.setCardExpiryDate("12/35");
        assertEquals("12/35", paymentMethod.getCardExpiryDate());
    }
}
