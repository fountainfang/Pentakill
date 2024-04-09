package org.pentakill.web;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pentakill.business.*;
import org.pentakill.db.DBManager;
import javax.servlet.http.*;
import java.io.*;


public class RegServlet extends BaseServlet{

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
        try {
            String jsonStr = getJsonfromRequest(request);
            //jsonStr = "{\"firstName\":\"Eric\",\"lastName\":\"Chen\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"123456\",\"address\":\"Academy Way\",\"city\":\"Kelowna\",\"province\":\"British Columbia\",\"postalCode\":\"V1V3C9\",\"country\":\"Canada\",\"userId\":\"eric\",\"password\":\"123\"}";
            System.out.println("get Client "+jsonStr);
            boolean doPost = false;
            try {
                ICustomer aCustomer = customerFactory.createCustomer(jsonStr);
                if(dbManager.saveCustomer(aCustomer)){
                    doPost = true;
                }
            }catch (Exception e){
                e.printStackTrace();
            }
            ObjectNode responseMessage = JsonNodeFactory.instance.objectNode();
            responseMessage.put("success", false);
            responseMessage.put("message", CREATE_CUSTOMER);
            if(doPost) {
                responseMessage.put("success", true);
            }

            // Write the response back
            writeResponse(response, responseMessage);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

    }

}
