package org.pentakill.web;

import org.pentakill.business.*;
import org.pentakill.db.DBManager;
import javax.servlet.http.*;
import java.io.*;


public class RegServlet extends HttpServlet{

    // example JSON string from the request like: {"customerId":123,"firstName":"Eric","lastName":"Chen","email":"abc@gmail.com","phoneNum":"123456","address":"Academy Way","city":"Kelowna","state":"BC","postalCode":"V1V3C9","country":"CA","userId":"eric","password":"123"}
    private String JSON_STR = "JSONSTR";
    private String CREATE_CUSTOMER = "CREATE_CUSTOMER";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
            // Set the response content type to HTML
            response.setContentType("text/html");

            // Get the print writer object to write the HTML page
            PrintWriter out = response.getWriter();

            // Write the HTML content
            out.println("<!DOCTYPE html>");
            out.println("<html lang=\"en\">");
            out.println("<head>");
            out.println("<meta charset=\"UTF-8\">");
            out.println("<title>Test Page</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>This is a Test Page</h1>");
            out.println("<p>Hello, welcome to the test page served by a RegServlet.</p>");
            out.println("</body>");
            out.println("</html>");
    }

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

            String jsonStr = inputStringBuilder.toString();
            //jsonStr = "{\"firstName\":\"Eric\",\"lastName\":\"Chen\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"123456\",\"address\":\"Academy Way\",\"city\":\"Kelowna\",\"province\":\"British Columbia\",\"postalCode\":\"V1V3C9\",\"country\":\"Canada\",\"userId\":\"eric\",\"password\":\"123\"}";
            System.out.println("get Client "+jsonStr);
            boolean doPost = false;
            try {
                CustomerFactory.getInstance();
                ICustomer aCustomer = CustomerFactory.createCustomer(jsonStr);
                if(DBManager.getInstance().saveCustomer(aCustomer)){
                    doPost = true;
                }
            }catch (Exception e){
                e.printStackTrace();
            }
            String jsonResponse = "{\"success\":\"false\", \"message\": \"" + CREATE_CUSTOMER + "\"}";
            if(doPost) {
                jsonResponse = "{\"success\":\"true\", \"message\": \"" + CREATE_CUSTOMER + "\"}";
            }

            // Create the response JSON String and write it back to the response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            //String jsonResponse = "{\"success\":\"true\", \"message\": \"" + CREATE_CUSTOMER + "\"}";

            // Write the response back
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
            out.flush();

        }
        catch (IOException e) {
            e.printStackTrace();
        }

    }

}
