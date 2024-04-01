package org.pentakill.web;

import org.pentakill.business.*;
import org.pentakill.db.DBManager;

import javax.servlet.http.*;
import java.io.BufferedReader;
import java.io.PrintWriter;

public class RatingServlet extends HttpServlet {
    private static final String RATING = "RATING";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        // read the JSON string from the request
        // String jsonStr = request.getParameter(JSON_STR);
        StringBuilder inputStringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                inputStringBuilder.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String jsonStr = inputStringBuilder.toString();
        //    orderId INT,
        //    eventId INT,
        //    reviewRating INT,
        //    reviewDate DATE,
        //    customerId INT,
        //    reviewComment VARCHAR(1000),
        //jsonStr = "{\"orderId\":\"123\",\"eventId\":\"111\",\"reviewRating\":\"5\",\"reviewDate\":\"2024-03-22 15:00:00\",\"customerId\":\"111\",\"reviewComment\":\"Magnificent\"}";
        System.out.println("get Rating" + jsonStr);
        boolean doPost = false;
        try {
            Rating rating =CustomerFactory.getInstance().getObjectMapper().readValue(jsonStr, Rating.class);
            int eventRating= DBManager.getInstance().saveRating(rating.getOrderId(), rating.getEventId(), rating.getReviewRating(), rating.getReviewDate(), rating.getCustomerId(), rating.getReviewComment());
            if(eventRating!=0){
                doPost = true;
            }
            String jsonResponse = "{\"success\":\"false\", \"message\": \"" + RATING + "\",eventId:"+rating.getEventId()+"\",eventRating:0\"}";
            if(doPost) {
                jsonResponse = "{\"success\":\"true\", \"message\": \"" + RATING + "\",eventId:"+rating.getEventId()+"\",eventRating\":"+eventRating+"}";
            }

            // Create the response JSON String and write it back to the response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            // Write the response back
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
            out.flush();
        } catch (Exception e) {
                e.printStackTrace();
        }

    }


}
