package org.pentakill.web;

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

        //todo: parse the JSON string and do Customer login/Logoff


        // Create the response JSON String and write it back to the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        String jsonResponse = "{\"success\": true, \"message\": \"" + LOGIN + "\"}";

        // Write the response back
        try (PrintWriter out = response.getWriter()) {
            out.print(jsonResponse);
            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}