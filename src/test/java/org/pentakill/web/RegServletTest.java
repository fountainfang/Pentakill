package org.pentakill.web;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.*;
import static org.mockito.Mockito.*;
import org.mockito.junit.jupiter.*;
import org.pentakill.business.ICustomer;
import org.pentakill.db.DBManager;

import javax.servlet.http.*;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@ExtendWith(MockitoExtension.class)
public class RegServletTest {
    @Mock
    HttpServletRequest request;
    @Mock
    HttpServletResponse response;

    @Captor
    private ArgumentCaptor<String> captor;

    @Mock
    private Connection mockConnection;

    @Mock
    private PreparedStatement mockPreparedStatement;

    @Mock
    private ResultSet mockResultSet;

    private DBManager dbManager;

    @BeforeEach
    public void init() throws Exception {
        mockConnection = mock(Connection.class);
        mockPreparedStatement = mock(PreparedStatement.class);
        mockResultSet = mock(ResultSet.class);

        // Mocking DBManager's getConnection method to return the mocked connection
        dbManager = spy(DBManager.getInstance());
        doReturn(mockConnection).when(dbManager).getConnection();
        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);

        // Mock executeUpdate to return 1, indicating a row was inserted
//        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        //ICustomer mockCustomer = mock(ICustomer.class);
        // Stubbing methods of mockCustomer
        //when(mockCustomer.getFirstName()).thenReturn("John");
        //when(mockCustomer.getLastName()).thenReturn("Doe");
        // Continue stubbing other methods...

        //boolean result = dbManager.saveCustomer(mockCustomer);
    }

    @Test
    public void testDoPostSuccess() throws Exception {

        // example JSON string from the request like: {"firstName":"Eric","lastName":"Chen","email":"abc@gmail.com","phoneNum":"123456","address":"Academy Way","city":"Kelowna","state":"BC","postalCode":"V1V3C9","country":"CA","userid":"eric","password":"123"}
        // Prepare input content for the request
        String inputContent = "{\"firstName\":\"EricTest\",\"lastName\":\"Chen\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"345678\",\"address\":\"Academy Way\","+
            "\"city\":\"Kelowna\",\"province\":\"BC\",\"postalCode\":\"V1V3C9\",\"country\":\"CA\",\"userId\":\"erictest\",\"password\":\"123\"}";

         // Stub the getReader() method to return the mock BufferedReader
        when(request.getReader()).thenReturn(new BufferedReader(new StringReader(inputContent)));
        // Prepare to capture the response content
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);

        // Mock executeUpdate to return 1, indicating a row was inserted
        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        //init the servlet
        RegServlet servlet = new RegServlet();
        servlet.init();
        servlet.setDBManager(dbManager);

        // Act: Invoke the doPost method
        servlet.doPost(request, response);

        // Flush the writer to ensure all output has been written to the StringWriter
        writer.flush();


        // Assert: Verify the content written to the response
        // example jsonString Response is like  "{\"success\": \"true\", \"message\": \"CREATE_CUSTOMER\"}"
        String responseContent = stringWriter.toString();
        assertTrue(responseContent.contains("{\"success\":true,\"message\":\"CREATE_CUSTOMER\"}"),
                   "Response content should contain 'expected response content'.");

        // Optionally, verify that getWriter and other methods were called
        //verify(response).getWriter();
        //verify(request).getReader();
        // Optionally, you can verify http status
        verify(response).setStatus(HttpServletResponse.SC_OK);

    }

    @Test
    public void testDoPostFail() throws Exception{
        StringWriter stringWriter = null;

        String inputContent =
                "{\"FirstName\":\"Eric\",\"lastName\":\"Chen\",\"email\":\"abc@gmail.com\",\"phoneNum\":\"123456\",\"address\":\"Academy Way\"," +
                "\"city\":\"Kelowna\",\"province\":\"BC\",\"postalCode\":\"V1V3C9\",\"country\":\"CA\",\"userId\":\"eric\",\"password\":\"123\"}";

        // Stub the getReader() method to return the mock BufferedReader
        when(request.getReader()).thenReturn(new BufferedReader(new StringReader(inputContent)));
        // Prepare to capture the response content
        stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(writer);

        //init the servlet
        RegServlet servlet = new RegServlet();
        servlet.init();
        servlet.setDBManager(dbManager);
        // Act: Invoke the doPost method
        servlet.doPost(request, response);


        // Flush the writer to ensure all output has been written to the StringWriter
        writer.flush();

        // Assert: Verify the content written to the response
        // example jsonString Response is like  "{\"success\": \"false\", \"message\": \"CREATE_CUSTOMER\"}"
        String responseContent = stringWriter.toString();
        assertTrue(responseContent.contains("{\"success\":false,\"message\":\"CREATE_CUSTOMER\"}"),
                   "Response content should contain 'expected response content'.");

        // Optionally, verify that getWriter and other methods were called
        //verify(response).getWriter();
        //verify(request).getReader();
        // Optionally, you can verify http status
        verify(response).setStatus(HttpServletResponse.SC_OK);

    }

}
