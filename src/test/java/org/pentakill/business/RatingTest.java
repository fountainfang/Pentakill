package org.pentakill.business;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class RatingTest {

    public static Rating rating;
    @BeforeEach
    public void init() {
        rating = new Rating(1, 1, 1, 5, "2021-01-01", 1, "Great event");
    }

    @Test
    public void testGetReviewId() {
        assertEquals(1, rating.getReviewId());
    }

    @Test
    public void testSetReviewId() {
        rating.setReviewId(2);
        assertEquals(2, rating.getReviewId());
    }

    @Test
    public void testGetOrderId() {
        assertEquals(1, rating.getOrderId());
    }

    @Test
    public void testSetOrderId() {
        rating.setOrderId(2);
        assertEquals(2, rating.getOrderId());
    }

    @Test
    public void testGetEventId() {
        assertEquals(1, rating.getEventId());
    }

    @Test
    public void testSetEventId() {
        rating.setEventId(2);
        assertEquals(2, rating.getEventId());
    }

    @Test
    public void testGetReviewRating() {
        assertEquals(5, rating.getReviewRating());
    }

    @Test
    public void testSetReviewRating() {
        rating.setReviewRating(4);
        assertEquals(4, rating.getReviewRating());
    }

    @Test
    public void testGetReviewDate() {
        assertEquals("2021-01-01", rating.getReviewDate());
    }

    @Test
    public void testSetReviewDate() {
        rating.setReviewDate("2021-01-02");
        assertEquals("2021-01-02", rating.getReviewDate());
    }

    @Test
    public void testGetCustomerId() {
        assertEquals(1, rating.getCustomerId());
    }

    @Test
    public void testSetCustomerId() {
        rating.setCustomerId(2);
        assertEquals(2, rating.getCustomerId());
    }

    @Test
    public void testGetReviewComment() {
        assertEquals("Great event", rating.getReviewComment());
    }

    @Test
    public void testSetReviewComment() {
        rating.setReviewComment("Good event");
        assertEquals("Good event", rating.getReviewComment());
    }


}
