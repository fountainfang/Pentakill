package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class TestRating {
    static Rating rating;

    @BeforeEach
    public void initial() {
        rating = new Rating(5, "Very Good!");
    }

    @Test
    public void testGetOrder() {
        assertEquals(5, rating.getRateValue());
        assertEquals("Very Good!", rating.getComment());
    }

    @Test
    public void testSetRateValue() {
        rating.setRateValue(1);
        assertEquals(1, rating.getRateValue());
    }

    @Test
    public void testSetComment() {
        rating.setComment("Very Bad!");
        assertEquals("Very Bad!", rating.getComment());
    }
}
