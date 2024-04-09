package org.pentakill.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pentakill.business.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class OrderServlet extends BaseServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        boolean hasSession = session!= null;
        if(hasSession){
            try {
                //String jsonStr = getJsonfromRequest(request);
                ObjectNode responseMessage = JsonNodeFactory.instance.objectNode(); // create a JSON object
                responseMessage.put("success", false); // set the success flag to false
                Customer customer = (Customer) session.getAttribute(LoginServlet.LOGIN_CUSTOMER);
                List<PayMethod> payMethods = dbManager.getPayMethods(customer.getCustomerId()); // get the payMethods for the customer
                if(payMethods != null && payMethods.size() > 0) { // if there are payMethods
                    responseMessage.put("success", true);
                    responseMessage.set("payMethods",CustomerFactory.getInstance().getObjectMapper().valueToTree(payMethods));
                }
                else{
                        responseMessage.put("payMethods", "No payMethods for Customer."); // set the message to "No payMethods for Customer."
                }
                writeResponse(response,responseMessage);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        else{
            try {
                writeResponseNeedLogin(response);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        // read the JSON string from the request
        boolean doPost = false;
        HttpSession session = request.getSession(false);
        boolean hasSession = session!= null;
        ObjectMapper objectMapper = CustomerFactory.getInstance().getObjectMapper(); // get the ObjectMapper
        ObjectNode responseMessage = JsonNodeFactory.instance.objectNode(); // create a JSON object
        if(hasSession){
            try{
                String jsonStr = getJsonfromRequest(request);

                responseMessage.put("success", false);
                JsonNode rootNode = objectMapper.readTree(jsonStr);
                boolean paymentResult = false;
                Order saveOrderResult = null;
                if (rootNode instanceof ObjectNode) { // if the rootNode is an ObjectNode
                    JsonNode payMethodNode = ((ObjectNode) rootNode).remove("payMethod");
                    if(payMethodNode != null){ // if there is a payMethod
                        CreditCard creditCard = objectMapper.treeToValue(payMethodNode,CreditCard.class); // convert the payMethodNode to a CreditCard object
                        JsonNode payDateNode = ((ObjectNode) rootNode).remove("payDate"); // remove the payDate from the rootNode
                        String payDate = payDateNode.asText(); // get the payDate as a String
                        Customer customer = (Customer) session.getAttribute(LoginServlet.LOGIN_CUSTOMER); // get the customer from the session
                        ShoppingCart shoppingCart = customer.getShoppingCart();
                        if(creditCard.validatePaymentDetails(payDate)){ // if the creditCard is valid
                            paymentResult = creditCard.processPayment(shoppingCart.getTotalAmount()); // process the payment
                            if(paymentResult){ // if the payment is successful
                                saveOrderResult = dbManager.saveOrder(customer,payDate,shoppingCart.getTotalAmount(),creditCard,shoppingCart.getShoppingCartItems()); // save the order
                                if(paymentResult && saveOrderResult!=null){ // if the payment is successful and the order is saved
                                    shoppingCart.clearShoppingCart(); // clear the shopping cart
                                    responseMessage.put("success", true); // set the success flag to true
                                    responseMessage.set("message", objectMapper.valueToTree(saveOrderResult)); // set the message to the saveOrderResult
                                }
                                else{ // if the payment is successful but the order is not saved
                                    responseMessage.put("message", "Payment sucess but SaveOrder failed.");
                                }
                            }
                            else{ // if the payment is not successful
                                responseMessage.put("message", "Payment failed.");
                            }
                        }
                        else{ // if the creditCard is not valid
                            responseMessage.put("message", "CreditCard validate failed.");
                        }

                    }
                    else{ // if there is no payMethod
                        responseMessage.put("message", "No payment method.");
                    }

                }

            }catch (Exception e){
                e.printStackTrace();
            }
            finally {
                try{
                    writeResponse(response,responseMessage);
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
        else{ // if there is no session
            try {
                writeResponseNeedLogin(response); // write the response that login is needed
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

}
