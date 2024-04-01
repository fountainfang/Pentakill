package org.pentakill.business;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class CustomerFactory {
    private static CustomerFactory factory;
    private static ObjectMapper objectMapper ;
    private CustomerFactory() {
        objectMapper = new ObjectMapper();
    }

    public static CustomerFactory getInstance() {
        if(factory == null) {
            factory = new CustomerFactory();
        }
        return factory;
    }

    public ObjectMapper getObjectMapper() {
        return objectMapper;
    }

    public static ICustomer createCustomer(String jsonStr) {
        Customer aCustomer = null;
        boolean isEventHolder = false;
        try {
            //assume the input jsonStr is like {"action":"login","userId":"user1","password":"password1","eventHolder":"1"} or {"action":"login","userid":"user1","password":"password1","eventHolder":"true"}
            String eventHolderValue = null;
            String newJsonStr = null;
            JsonNode rootNode = objectMapper.readTree(jsonStr);
            if( rootNode instanceof ObjectNode) {
                JsonNode eventHolderNode = ((ObjectNode) rootNode).remove("eventHolder");
                if (eventHolderNode != null) {
                    eventHolderValue = eventHolderNode.asText();
                    isEventHolder = true;
                    if (eventHolderValue != null) {
                        isEventHolder = eventHolderValue.equals("1") || eventHolderValue.equalsIgnoreCase("true");
                    }
                    newJsonStr = objectMapper.writeValueAsString(rootNode);
                }else {
                    newJsonStr = jsonStr;
                }
            }
            if (!isEventHolder) {
                aCustomer = objectMapper.readValue(newJsonStr, Customer.class);
            } else {
                aCustomer = objectMapper.readValue(newJsonStr, EventHolder.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return aCustomer;
    }

}
