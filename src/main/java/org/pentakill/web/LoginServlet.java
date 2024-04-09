package org.pentakill.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pentakill.business.*;
import org.pentakill.db.DBManager;
import javax.servlet.http.*;
import java.io.*;

public class LoginServlet extends BaseServlet {

    public static final String LOGIN = "login";
    public static final String LOGOUT = "logout";
    public static final String LOGIN_CUSTOMER = "loginCustomer";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        // read the JSON string from the request
        String jsonStr = null;
        try{
           jsonStr = getJsonfromRequest(request);
        } catch (Exception e) {
            e.printStackTrace();
        }



        //todo: parse the JSON string and do Customer login/Logoff operations
        //Client will send a JSON string with the following format:
        // for Login: {"action":"login","userId":"user1","password":"password1"}
        // for Logoff: {"action":"logoff","userId":"user1"}
        // The server will respond with a JSON string with the following format:
        // for Login: {"success":true,"message":"LOGIN","CustomerType":"EVENT_HOLDER","jsessionid":"23xjldjj"}  or {"success":false,"message":"LOGIN FAILED"}
        // for Logoff: {"success":true,"message":"LOGOFF"}
        ObjectMapper objectMapper = CustomerFactory.getInstance().getObjectMapper();


        //LoginInfo loginInfo = null;
        JsonNode actionNode = null;
        JsonNode userIdNode = null;
        JsonNode passwordNode = null;
        try {
            JsonNode rootNode = objectMapper.readTree(jsonStr);
            if( rootNode instanceof ObjectNode) {
                actionNode = ((ObjectNode) rootNode).remove("action");
                userIdNode = ((ObjectNode) rootNode).remove("userId");
                passwordNode = ((ObjectNode) rootNode).remove("password");
            }
             //loginInfo = objectMapper.readValue(jsonStr, LoginInfo.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        boolean actionResult = false;

        HttpSession session = request.getSession(false);
        boolean hasSession =  session!= null;

        ObjectNode responseMessage = JsonNodeFactory.instance.objectNode();
        responseMessage.put("success", false);

        //do user login or logoff, and set the responseMessage
        //if login is successful, genearte new HttpSession and set the session attribute "loginCustomer" to the logged in customer object, append jsessionid to the responseMessage
        //if logoff is successful, invalidate the HttpSession
        if(actionNode.asText().equals(LOGIN)) {
            Customer loginCustomer = DBManager.getInstance().loginCustomer(userIdNode.asText(), passwordNode.asText());
            if(loginCustomer!= null) {
                actionResult = true;
                //get the shopping cart for the customer
                ShoppingCart shoppingCart = DBManager.getInstance().getShoppingCart(loginCustomer.getCustomerId());
                loginCustomer.setShoppingCart(shoppingCart);
                //set the loginCustomer to the session
                session = request.getSession(true);
                session.setAttribute(LOGIN_CUSTOMER, loginCustomer);
                String sessionID = session.getId();
                responseMessage.put("success", true);
                responseMessage.put("message", LOGIN);
                responseMessage.put("jsessionid", sessionID);
                if(loginCustomer instanceof EventHolder){
                    session.setAttribute("isEventHolder", true);
                    responseMessage.put("CustomerType", "EVENT_HOLDER");
                    //responseMessage = "{\"success\":\"true\",\"message\":\"" + LOGIN + "\",\"CustomerType\":\"EVENT_HOLDER"  + "\",\"jsessionid\":\"" + sessionID + "\"}";
                }
                else{
                    responseMessage.put("CustomerType", "CUSTOMER");
                    //responseMessage = "{\"success\":\"true\",\"message\":\"" + LOGIN + "\",\"CustomerType\":\"CUSTOMER"  + "\",\"jsessionid\":\"" + sessionID + "\"}";
                }
            }
            else {
                //responseMessage = "{\"success\":\"false\",\"message\":\"" + LOGIN + " FAILED\"}";
                responseMessage.put("message", LOGIN + " FAILED");
            }
        } else if(actionNode.asText().equals(LOGOUT) && hasSession)
        {
            session.invalidate();
            actionResult = true;
            //responseMessage = "{\"success\":\"true\",\"message\":\"" + LOGOUT + "\"}";
            responseMessage.put("success", true);
            responseMessage.put("message", LOGOUT);
        }

        if(actionNode.asText().equals(LOGOUT) && !hasSession)
        {
            try {
                //response.sendRedirect(request.getContextPath() + "/login.html");
                writeResponseNeedLogin(response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else if( actionNode.asText().equals(LOGIN) || (actionNode.asText().equals(LOGOUT)&&hasSession) ){
            // Write the response back
            try{
                writeResponse(response, responseMessage);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*class LoginInfo {
        final static String LOGIN = "login";
        final static String LOGOUT = "logout";
        String action;
        String userId;
        String password;



        public LoginInfo(){
        }


        public LoginInfo(String action, String userId, String password){
            this.action = action;
            this.userId = userId;
            this.password = password;

        }

        public String getAction() {
            return action;
        }
        public String getUserId() {
            return userId;
        }
        public String getPassword() {
            return password;
        }

        public void setAction(String action) {
            this.action = action;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
        public void setPassword(String password) {
            this.password = password;
        }


    }*/
}