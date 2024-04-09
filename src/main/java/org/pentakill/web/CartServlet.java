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

public class CartServlet extends BaseServlet {
    public static final String ADD_TO_CART = "ADD_TO_CART";
    public static final String REMOVE_FROM_CART = "REMOVE_FROM_CART";
    public static final String CHANGE_CART_ITEM = "CHANGE_CART_ITEM";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        boolean hasSession = session!= null;
        ObjectNode responseMessage = JsonNodeFactory.instance.objectNode();
        responseMessage.put("success", false);
        //String responseMessage = "{\"success\":\"false\",\"message\":\"}";
        try {
            if (hasSession) {
                Customer customer = (Customer) session.getAttribute(LoginServlet.LOGIN_CUSTOMER); // get the customer from the session
                ShoppingCart shoppingCart = customer.getShoppingCart(); // get the shopping cart for the customer
                responseMessage.put("success", true);
                if (shoppingCart != null) { // if there are items in the cart
                    responseMessage.set("message", CustomerFactory.getInstance().getObjectMapper().valueToTree(shoppingCart));
                    //responseMessage = "{\"success\":\"true\",\"message\":\"";
                    //responseMessage += CustomerFactory.getInstance().getObjectMapper().writeValueAsString(shoppingCart) + "\"}";

                }
                else { // if there are no items in the cart
                    responseMessage.put("message", "No items in the cart.");
                    //responseMessage = "{\"success\":\"true\",\"message\":\"\"}";
                }
                writeResponse(response, responseMessage);
            }
            else // if there is no session
                writeResponseNeedLogin(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        // read the JSON string from the request
        // String jsonStr = request.getParameter(JSON_STR);
        HttpSession session = request.getSession(false);
        boolean hasSession = session!= null;
        //String responseMessage = "{\"success\":\"false\",\"message\":\"";
        ObjectNode responseMessage = JsonNodeFactory.instance.objectNode();
        responseMessage.put("success", false);
        try {
            if (hasSession) {
                Customer customer = (Customer) session.getAttribute(LoginServlet.LOGIN_CUSTOMER);
                ShoppingCart shoppingCart = customer.getShoppingCart();
//                StringBuilder inputStringBuilder = new StringBuilder();
//                BufferedReader reader = request.getReader();
//                String line;
//                while ((line = reader.readLine()) != null) {
//                    inputStringBuilder.append(line);
//                }
//                String jsonStr = inputStringBuilder.toString();
                String jsonStr = getJsonfromRequest(request);
                ObjectMapper objectMapper = CustomerFactory.getInstance().getObjectMapper();
                JsonNode rootNode = null;
                try {
                    rootNode = objectMapper.readTree(jsonStr);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                String action = rootNode.get("action").asText();
                boolean actionResult = false;
                if (action.equals(ADD_TO_CART)) { // if the action is ADD_TO_CART
                    int eventId = rootNode.get("eventId").asInt(); // get the eventId
                    double ticketPrice = rootNode.get("ticketPrice").asDouble(); // get the ticketPrice
                    int ticketNum = rootNode.get("ticketNum").asInt(); // get the ticketNum
                    boolean isSelected = rootNode.get("isSelected").asBoolean(); // get the isSelected
                    actionResult = shoppingCart.addShoppingCartItem(eventId, ticketPrice, ticketNum, isSelected); // add the item to the cart
                    if (actionResult) { // if the item was added successfully
                        //responseMessage = "{\"success\":\"true\",\"message\":\"" + ADD_TO_CART + "\"}";
                        responseMessage.put("success", true); // set the success flag to true
                        responseMessage.put("message", ADD_TO_CART); // set the message to ADD_TO_CART
                    }
                } else if (action.equals(REMOVE_FROM_CART)) {// if the action is REMOVE_FROM_CART
                    int eventId = rootNode.get("eventId").asInt(); // get the eventId
                    actionResult = shoppingCart.removeShoppingCartItem(eventId); // remove the item from the cart
                    if (actionResult) { // if the item was removed successfully
                        //responseMessage = "{\"success\":\"true\",\"message\":\"" + REMOVE_FROM_CART + "\"}";
                        responseMessage.put("success", true); // set the success flag to true
                        responseMessage.put("message", REMOVE_FROM_CART); // set the message to REMOVE_FROM_CART
                    }
                } else if (action.equals(CHANGE_CART_ITEM)) {// if the action is CHANGE_CART_ITEM
                    int eventId = rootNode.get("eventId").asInt(); // get the eventId
                    double ticketPrice = rootNode.get("ticketPrice").asDouble(); // get the ticketPrice
                    int ticketNum = rootNode.get("ticketNum").asInt(); // get the ticketNum
                    boolean isSelected = rootNode.get("isSelected").asBoolean(); // get the isSelected
                    actionResult = shoppingCart.itemChangeStatus(eventId, ticketPrice, ticketNum, isSelected); // change the status of the item
                    if (actionResult) { // if the status was changed successfully
                        //responseMessage = "{\"success\":\"true\",\"message\":\"" + CHANGE_CART_ITEM + "\"}";
                        responseMessage.put("success", true); // set the success flag to true
                        responseMessage.put("message", CHANGE_CART_ITEM); // set the message to CHANGE_CART_ITEM
                    }
                }
                if(!actionResult) // if the action was not successful
                    //responseMessage +=  action + "\"}";
                    responseMessage.put("message", action); // set the message to the action

                writeResponse(response, responseMessage); // write the response
            }
            else
                writeResponseNeedLogin(response); // write the response that login is needed
        }catch (Exception e) {
            e.printStackTrace();
        }
    }


}
