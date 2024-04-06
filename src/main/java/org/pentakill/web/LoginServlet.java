package org.pentakill.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.pentakill.business.*;
import org.pentakill.db.DBManager;
import javax.servlet.http.*;
import java.io.*;

public class LoginServlet extends HttpServlet {

    private static final String LOGIN = "LOGIN";
    private static final String LOGOUT = "LOGOUT";

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


        //todo: parse the JSON string and do Customer login/Logoff operations，
        //Client will send a JSON string with the following format:
        // for Login: {"action":"login","userId":"user1","password":"password1",}
        // for Logoff: {"action":"logoff","userId":"user1"}
        // The server will respond with a JSON string with the following format:
        // for Login: {"success":true,"message":"LOGIN","CustomerType":"EVENT_HOLDER","jsessionid":"23xjldjj"}  or {"success":false,"message":"LOGIN FAILED"}
        // for Logoff: {"success":true,"message":"LOGOFF"}
        ObjectMapper objectMapper = CustomerFactory.getInstance().getObjectMapper();
        LoginInfo loginInfo = null;
        try {
             loginInfo = objectMapper.readValue(jsonStr, LoginInfo.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        boolean actionResult = false;

        HttpSession session = request.getSession(false);
        boolean hasSession =  session!= null;

        String responseMessage ="{\"success\":\"false\",\"message\":\"}";

        //do user login or logoff, and set the responseMessage
        //if login is successful, genearte new HttpSession and set the session attribute "loginCustomer" to the logged in customer object, append jsessionid to the responseMessage
        //if logoff is successful, invalidate the HttpSession
        if(loginInfo.getAction().equals(LoginInfo.LOGIN)) {
            Customer loginCustomer = DBManager.getInstance().loginCustomer(loginInfo.getUserId(), loginInfo.getPassword());
            if(loginCustomer!= null) {
                actionResult = true;
                session = request.getSession(true);
                session.setAttribute("loginCustomer", loginCustomer);
                String sessionID = session.getId();
                if(loginCustomer instanceof EventHolder){
                    session.setAttribute("isEventHolder", true);
                    responseMessage = "{\"success\":\"true\",\"message\":\"" + LOGIN + "\",\"CustomerType\":\"EVENT_HOLDER"  + "\",\"jsessionid\":\"" + sessionID + "\"}";
                }
                else{
                    responseMessage = "{\"success\":\"true\",\"message\":\"" + LOGIN + "\",\"CustomerType\":\"CUSTOMER"  + "\",\"jsessionid\":\"" + sessionID + "\"}";
                }
            }
            else {
                responseMessage = "{\"success\":\"false\",\"message\":\"" + LOGIN + " FAILED\"}";
            }
        } else if(loginInfo.getAction().equals(LoginInfo.LOGOUT) && hasSession)
        {
            session.invalidate();
            actionResult = true;
            responseMessage = "{\"success\":\"true\",\"message\":\"" + LOGOUT + "\"}";
        }

        if(loginInfo.getAction().equals(LoginInfo.LOGOUT) && !hasSession)
        {
            try {
                response.sendRedirect(request.getContextPath() + "/login.html");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else if( loginInfo.getAction().equals(LoginInfo.LOGIN) || (loginInfo.getAction().equals(LoginInfo.LOGOUT)&&hasSession) ){
        // Create the response JSON String and write it back to the response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            //String jsonResponse = "{\"success\": true, \"message\": \"" + LOGIN + "\"}";

            // Write the response back
            try (PrintWriter out = response.getWriter()) {
                out.print(responseMessage);
                out.flush();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    class LoginInfo {
        String action;
        final static String LOGIN = "login";
        final static String LOGOUT = "logout";
        String userId;
        String password;

        public String getAction() {
            return action;
        }
        public String getUserId() {
            return userId;
        }

        public String getPassword() {
            return password;
        }
    }
}