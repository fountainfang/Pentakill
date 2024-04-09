package org.pentakill.business;

import java.util.Date;

public class Rating {
//    CREATE TABLE review (
//            reviewId INT IDENTITY,
//            orderId INT,
//            eventId INT,
//            reviewRating INT,
//            reviewDate DATE,
//            customerId INT,
//            reviewComment VARCHAR(1000),
//    PRIMARY KEY (reviewId),
//    UNIQUE (orderId, eventId)  -- Composite unique constraint
//);
    private int reviewId;
    private int orderId;
    private int eventId;
    private int reviewRating;
    private String reviewDate;
    private int customerId;
    private String reviewComment;

    public Rating() {
    }
    public Rating(int reviewId, int orderId, int eventId, int reviewRating, String reviewDate, int customerId, String reviewComment) {
        this.reviewId = reviewId;
        this.orderId = orderId;
        this.eventId = eventId;
        this.reviewRating = reviewRating;
        this.reviewDate = reviewDate;
        this.customerId = customerId;
        this.reviewComment = reviewComment;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getReviewRating() {
        return reviewRating;
    }

    public void setReviewRating(int reviewRating) {
        this.reviewRating = reviewRating;
    }

    public String getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(String reviewDate) {
        this.reviewDate = reviewDate;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getReviewComment() {
        return reviewComment;
    }

    public void setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
    }
}
