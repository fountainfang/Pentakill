package org.pentakill.business;

import com.fasterxml.jackson.databind.ObjectMapper;

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

    public static Customer createCustomer(String jsonStr) {
        Customer aCustomer = null;
        //todo search jsonStr for the indicated fields and create a Customer or EventHolder object

        boolean isEventHolder = false;
        try {
            if(!isEventHolder) {
                aCustomer = objectMapper.readValue(jsonStr, Customer.class);
            } else {
                aCustomer = objectMapper.readValue(jsonStr, EventHolder.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return aCustomer;
    }

}
