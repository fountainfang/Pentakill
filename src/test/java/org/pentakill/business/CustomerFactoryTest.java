package org.pentakill.business;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
public class CustomerFactoryTest {

    static CustomerFactory customerFactory;

    @BeforeAll
    public static void init() {
        customerFactory = CustomerFactory.getInstance();
    }

    @Test
    public void testGetInstance() {
        CustomerFactory customerFactory2 = CustomerFactory.getInstance();
        assertEquals(customerFactory, customerFactory2);
    }

    @Test
    public void testGetObjectMapper() {
        ObjectMapper objectMapper = customerFactory.getObjectMapper();
        assertNotNull(objectMapper);
    }

    @Test
    public void testCreateCustomerWithJsonStr() {
        //assume the input jsonStr from front-end is like {"customerId":123,"firstName":"FIRSTNAME","lastName":"LASTNAME","email":"abc@gmail.com","phoneNum":"12345678",
        // "city":"kelowna","state":"BC","postalCode":"V1V3C9","country":"Canada","userid":"user1","password":"password1"}
        String jsonStr = "{\"customerId\":123,\"firstName\":\"FIRSTNAME\",\"lastName\":\"LASTNAME\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"12345678\","+
        "\"city\":\"kelowna\",\"state\":\"BC\",\"postalCode\":\"V1V3C9\",\"country\":\"Canada\",\"userid\":\"user1\",\"password\":\"password1\"}";
        ICustomer customer = customerFactory.createCustomer(jsonStr);
        assertTrue(customer instanceof Customer);
    }

    @Test
    public void testCreateEventHolderWithJsonStr() {
        //assume the input jsonStr from front-end is like {"customerId":123,"firstName":"FIRSTNAME","lastName":"LASTNAME","email":"abc@gmail.com","phoneNum":"12345678",
        // "city":"kelowna","state":"BC","postalCode":"V1V3C9","country":"Canada","userid":"user1","password":"password1","eventHolder":"1"}
        String jsonStr = "{\"customerId\":123,\"firstName\":\"FIRSTNAME\",\"lastName\":\"LASTNAME\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"12345678\","+
        "\"city\":\"kelowna\",\"state\":\"BC\",\"postalCode\":\"V1V3C9\",\"country\":\"Canada\",\"userid\":\"user1\",\"password\":\"password1\",\"eventHolder\":\"1\"}";
        ICustomer eventHolder = customerFactory.createCustomer(jsonStr);
        assertTrue(eventHolder instanceof EventHolder);
    }

}
