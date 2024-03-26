package org.pentakill.web;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.*;
import static org.mockito.Mockito.*;
import org.mockito.junit.jupiter.*;

import javax.servlet.http.*;
import java.io.*;

@ExtendWith(MockitoExtension.class)
public class RegServletTest {
    @Mock
    HttpServletRequest request;
    @Mock
    HttpServletResponse response;

    @Captor
    private ArgumentCaptor<String> captor;

    @Test
    public void testDoPostSuccess() throws Exception {

        // example JSON string from the request like: {"firstName":"Eric","lastName":"Chen","email":"abc@gmail.com","phoneNum":"123456","address":"Academy Way","city":"Kelowna","state":"BC","postalCode":"V1V3C9","country":"CA","userid":"eric","password":"123"}
        // Prepare input content for the request
        String inputContent = "{\"firstName\":\"Eric\",\"lastName\":\"Chen\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"123456\",\"address\":\"Academy Way\","+
            "\"city\":\"Kelowna\",\"province\":\"BC\",\"postalCode\":\"V1V3C9\",\"country\":\"CA\",\"userId\":\"eric\",\"password\":\"123\"}";

         // Stub the getReader() method to return the mock BufferedReader
        when(request.getReader()).thenReturn(new BufferedReader(new StringReader(inputContent)));
        // Prepare to capture the response content
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);

        //init the servlet
        RegServlet servlet = new RegServlet();

        // Act: Invoke the doPost method
        servlet.doPost(request, response);

        // Flush the writer to ensure all output has been written to the StringWriter
        writer.flush();


        // Assert: Verify the content written to the response
        // example jsonString Response is like  "{\"success\": \"true\", \"message\": \"CREATE_CUSTOMER\"}"
        String responseContent = stringWriter.toString();
        assertTrue(responseContent.contains("{\"success\":\"true\", \"message\": \"CREATE_CUSTOMER\"}"),
                   "Response content should contain 'expected response content'.");

        // Optionally, verify that getWriter and other methods were called
        verify(response).getWriter();
        verify(request).getReader();
        // Optionally, you can verify http status
        verify(response).setStatus(HttpServletResponse.SC_OK);

    }

    @Test
    public void testDoPostFail() throws Exception{
        String inputContent = "{\"FirstName\":\"Eric\",\"lastName\":\"Chen\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"123456\",\"address\":\"Academy Way\","+
                              "\"city\":\"Kelowna\",\"province\":\"BC\",\"postalCode\":\"V1V3C9\",\"country\":\"CA\",\"userId\":\"eric\",\"password\":\"123\"}";

        // Stub the getReader() method to return the mock BufferedReader
        when(request.getReader()).thenReturn(new BufferedReader(new StringReader(inputContent)));
        // Prepare to capture the response content
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);

        //init the servlet
        RegServlet servlet = new RegServlet();

        // Act: Invoke the doPost method
        servlet.doPost(request, response);


        // Flush the writer to ensure all output has been written to the StringWriter
        writer.flush();


        // Assert: Verify the content written to the response
        // example jsonString Response is like  "{\"success\": \"false\", \"message\": \"CREATE_CUSTOMER\"}"
        String responseContent = stringWriter.toString();
        assertTrue(responseContent.contains("{\"success\":\"false\", \"message\": \"CREATE_CUSTOMER\"}"),
                   "Response content should contain 'expected response content'.");

        // Optionally, verify that getWriter and other methods were called
        verify(response).getWriter();
        verify(request).getReader();
        // Optionally, you can verify http status
        verify(response).setStatus(HttpServletResponse.SC_OK);

    }

}
