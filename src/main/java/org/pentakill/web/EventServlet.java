package org.pentakill.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pentakill.business.*;
import org.pentakill.db.DBManager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.List;

public class EventServlet extends BaseServlet{


    public static final String QUERY_EVENT_DEATIL = "QUERY_EVENT_DEATIL";
    public static final String SAVE_EVENT = "SAVE_EVENT";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try{
            // do Event getEventsSummary operations
            // Client need not send any inout String, just GET the URL:
            // The server will respond with a JSON string with the following format, the message value is a JSON array of Event objects:
            // for query success: {"success":"true","message":"eventId":"123","eventName":"XXX","eventDesc":"XXXX"......}
            // for query failure : {"success":"false","message":""}

            ObjectNode responseMessage = JsonNodeFactory.instance.objectNode(); // create a JSON object
            responseMessage.put("success", false); // set the success flag to false
            List<Event> events = DBManager.getInstance().getEventsSummary(); // get the events summary
            // Set the response content type to JSON
            if(events!=null && !events.isEmpty()) { // if there are events
                responseMessage.put("success", true);
                responseMessage.set("message", CustomerFactory.getInstance().getObjectMapper().valueToTree(events));
            }else { // if there are no events
                responseMessage.put("message", "No events found.");
            }
            // Write the response back
            writeResponse(response, responseMessage); // write the response
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response){
        // read the JSON string from the request
        // String jsonStr = request.getParameter(JSON_STR);
        HttpSession session = request.getSession(false);
        boolean hasSession = session!= null;
        if(hasSession) {
            // parse the JSON string and do Event getEventDeatil operations
            // Client will send a JSON string with the following format:
            // for queryEventDetail: {"action":"QUERY_EVENT_DEATIL","eventId":"123"}
            // The server will respond with a JSON string with the following format:
            // for query success: {"success":"true","message":"eventId":"123","eventName":"XXX","eventDesc":"XXXX"......}
            // for query failure : {"success":"false","message":""}
            ObjectMapper objectMapper = CustomerFactory.getInstance().getObjectMapper(); // get the ObjectMapper
            ObjectNode responseMessage = JsonNodeFactory.instance.objectNode(); // create a JSON object
            responseMessage.put("success", false);
            try {
                String jsonStr = getJsonfromRequest(request);
                JsonNode rootNode = objectMapper.readTree(jsonStr);
                if (rootNode instanceof ObjectNode) { // if the rootNode is an ObjectNode
                    JsonNode actionNode = ((ObjectNode) rootNode).remove("action");

                    if (actionNode != null && actionNode.isTextual()) { // if there is an action
                        String actionValue = actionNode.asText();
                        if (actionValue.equals(QUERY_EVENT_DEATIL)) { // if the action is QUERY_EVENT_DEATIL
                            JsonNode eventIdNode = ((ObjectNode) rootNode).remove("eventId"); // remove the eventId from the rootNode
                            int eventId = eventIdNode.asInt();
                            Event event = DBManager.getInstance().getEventDetail(eventId);
                            if (event != null) { // if the event is found
                                //String eventJson = CustomerFactory.getInstance().getObjectMapper().writeValueAsString(event);
                                responseMessage.put("success", true);
                                responseMessage.set("message", CustomerFactory.getInstance().getObjectMapper().valueToTree(event));

                                //responseMessage = "{\"success\":\"true\", \"message\": \"" + eventJson + "\"}";
                            }
                        }
                        else if (actionValue.equals(SAVE_EVENT)) { // if the action is SAVE_EVENT
                            Customer loginCustomer = (Customer) session.getAttribute(LoginServlet.LOGIN_CUSTOMER);
                            if( !(loginCustomer instanceof EventHolder)){ // if the customer is not an EventHolder
                                responseMessage.put("message", "You are not authorized to save event.");
                                //responseMessage = "{\"success\":\"false\",\"message\":\"" + SAVE_EVENT + " FAILED\"}";
                            }
                            else{ // if the customer is an EventHolder
                                Event event = objectMapper.readValue(rootNode.toString(), Event.class);
                                boolean success = DBManager.getInstance().saveEvent(event);
                                if (success) {
                                    responseMessage.put("success", true);
                                    responseMessage.put("message", SAVE_EVENT);
                                    //responseMessage = "{\"success\":\"true\", \"message\":\""+SAVE_EVENT+"\"}";
                                }
                            }
                        }
                    }
                }
                // Set the response content type to JSON
                writeResponse(response, responseMessage);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else{
            try {
                writeResponseNeedLogin(response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


}
