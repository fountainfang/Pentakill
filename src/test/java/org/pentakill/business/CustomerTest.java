package org.pentakill.business;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
public class CustomerTest {

    static Customer customer;
    @BeforeEach
    public void init() {
        customer = new Customer(1, "Tom", "Chen", "abc@gmail.com", "123456", "AAA Way", "kelowna", "BC", "V1V3C9", "CA",
                             "Tom", "123");
    }


    @Test
    public void testCustomer() {
        assertEquals(1, customer.getCustomerId());
        assertEquals("Tom", customer.getFirstName());
        assertEquals("Chen", customer.getLastName());
        assertEquals("123456", customer.getPhoneNum());
    }

    @Test
    public void testSetCustomerId() {
        customer.setCustomerId(2);
        assertEquals(2, customer.getCustomerId());
    }

    @Test
    public void testSetFirstName() {
        customer.setFirstName("Jerry");
        assertEquals("Jerry", customer.getFirstName());
    }

    @Test
    public void testSetLastName() {
        customer.setLastName("Wang");
        assertEquals("Wang", customer.getLastName());
    }

    @Test
    public void testSetPhoneNum() {
        customer.setPhoneNum("1234567");
        assertEquals("1234567", customer.getPhoneNum());
    }

    @Test
    public void testSetEmail() {
        customer.setEmail("efg@gmail.com");
        assertEquals("efg@gmail.com", customer.getEmail());
    }

    @Test
    public void testSetAddress() {
        customer.setAddress("BBB Way");
        assertEquals("BBB Way", customer.getAddress());
    }

    @Test
    public void testSetCity() {
        customer.setCity("Vancouver");
        assertEquals("Vancouver", customer.getCity());
    }

    @Test
    public void testSetProvince() {
        customer.setProvince("AB");
        assertEquals("AB", customer.getProvince());
    }

    @Test
    public void testSetPostalCode() {
        customer.setPostalCode("V1V3C8");
        assertEquals("V1V3C8", customer.getPostalCode());
    }

    @Test
    public void testSetCountry() {
        customer.setCountry("US");
        assertEquals("US", customer.getCountry());
    }

    @Test
    public void testSetUserId() {
        customer.setUserId("Jerry");
        assertEquals("Jerry", customer.getUserId());
    }

    @Test
    public void testSetPassword() {
        customer.setPassword("345");
        assertEquals("345", customer.getPassword());
    }

}
