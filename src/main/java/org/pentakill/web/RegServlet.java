package org.pentakill.web;

import org.pentakill.business.*;
import org.pentakill.db.DBManager;
import javax.servlet.http.*;
import java.io.*;


public class RegServlet extends HttpServlet{

    private String JSON_STR = "JSONSTR";
    private String CREATE_CUSTOMER = "CREATE_CUSTOMER";
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response){
        //read the JSON string from the request
        //String jsonStr = request.getParameter(JSON_STR);
        StringBuilder inputStringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                inputStringBuilder.append(line);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        String jsonStr = inputStringBuilder.toString();

        CustomerFactory factory = CustomerFactory.getInstance();
        ICustomer aCustomer = CustomerFactory.createCustomer(jsonStr);
        DBManager dbManager = DBManager.getInstance();
        dbManager.saveCustomer(aCustomer);


        // Create the response JSON String and write it back to the response
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        String jsonResponse = "{\"success\": true, \"message\": \"" + CREATE_CUSTOMER + "\"}";

        // Write the response back
        try (PrintWriter out = response.getWriter()) {
            out.print(jsonResponse);
            out.flush();
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
