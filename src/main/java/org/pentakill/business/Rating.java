package org.pentakill.business;

public class Rating {
    private int rateValue;
    private String comment;

    public Rating(int rateValue, String comment) {
        setRateValue(rateValue);
        setComment(comment);
    }

    public void setRateValue(int rateValue) {
        this.rateValue = rateValue;
    }

    public int getRateValue() {
        return rateValue;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getComment() {
        return comment;
    }
}
