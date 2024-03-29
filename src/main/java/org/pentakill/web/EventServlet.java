package org.pentakill.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pentakill.business.CustomerFactory;
import org.pentakill.business.Event;
import org.pentakill.db.DBManager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.List;

public class EventServlet extends HttpServlet{


    private static final String QUERY_EVENT_DEATIL = "QUERY_EVENT_DEATIL";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try{
            // do Event getEventsSummary operations，
            // Client need not send any inout String, just GET the URL:
            // The server will respond with a JSON string with the following format, the message value is a JSON array of Event objects:
            // for query success: {"success":"true","message":"eventId":"123","eventName":"XXX","eventDesc":"XXXX"......}
            // for query failure : {"success":"false","message":""}

            String responseMessage = "{\"success\":\"false\",\"message\":\"}";
            List<Event> events = DBManager.getInstance().getEventsSummary();
            // Set the response content type to JSON
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            if(events!=null) {
                String eventsJson = CustomerFactory.getInstance().getObjectMapper().writeValueAsString(events);
                responseMessage = "{\"success\":\"true\", \"message\": \"" + eventsJson + "\"}";
                // Create the response JSON String and write it back to the response
            }
            // Write the response back
            PrintWriter out = response.getWriter();
            out.print(responseMessage);
            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response){
        // read the JSON string from the request
        // String jsonStr = request.getParameter(JSON_STR);
        boolean hasSession = request.getSession(false) != null;
        if(hasSession) {
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

            // parse the JSON string and do Event getEventDeatil operations，
            // Client will send a JSON string with the following format:
            // for queryEventDetail: {"action":"QUERY_EVENT_DEATIL","eventId":"123"}
            // The server will respond with a JSON string with the following format:
            // for query success: {"success":"true","message":"eventId":"123","eventName":"XXX","eventDesc":"XXXX"......}
            // for query failure : {"success":"false","message":""}
            ObjectMapper objectMapper = CustomerFactory.getInstance().getObjectMapper();
            String responseMessage = "{\"success\":\"false\",\"message\":\"}";
            try {
                JsonNode rootNode = objectMapper.readTree(jsonStr);
                if (rootNode instanceof ObjectNode) {
                    JsonNode actionNode = ((ObjectNode) rootNode).remove("action");
                    JsonNode eventIdNode = ((ObjectNode) rootNode).remove("eventId");
                    if (actionNode != null && eventIdNode != null) {
                        String actionValue = actionNode.asText();
                        int eventId = eventIdNode.asInt();
                        if (actionValue.equals(QUERY_EVENT_DEATIL)) {
                            Event event = DBManager.getInstance().getEventDetail(eventId);
                            if (event != null) {
                                String eventJson = CustomerFactory.getInstance().getObjectMapper().writeValueAsString(event);
                                responseMessage = "{\"success\":\"true\", \"message\": \"" + eventJson + "\"}";
                            }
                        }
                    }
                }
                // Set the response content type to JSON
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.setStatus(HttpServletResponse.SC_OK);
                // Write the response back
                PrintWriter out = response.getWriter();
                out.print(responseMessage);
                out.flush();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            try {
                response.sendRedirect(request.getContextPath() + "/login.html");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


}
