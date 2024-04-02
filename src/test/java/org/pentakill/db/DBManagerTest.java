package org.pentakill.db;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.junit.jupiter.MockitoExtension;
import org.pentakill.business.*;
import java.sql.*;


@ExtendWith(MockitoExtension.class)
public class DBManagerTest {

    @Mock
    private Connection mockConnection;

    @Mock
    private PreparedStatement mockPreparedStatement;

    @Mock
    private ResultSet mockResultSet;

    private DBManager dbManager;

    @BeforeEach
    public void setup() throws Exception {
//        MockitoAnnotations.initMocks(this);
//        //dbManager = DBManager.getInstance();
//        dbManager = new DBManager();
//        when(dbManager.getConnection()).thenReturn(connection);
//        when(connection.prepareStatement(anyString())).thenReturn(preparedStatement);
//        when(preparedStatement.executeQuery()).thenReturn(resultSet);
        mockConnection = mock(Connection.class);
        mockPreparedStatement = mock(PreparedStatement.class);
        mockResultSet = mock(ResultSet.class);

        // Mocking DBManager's getConnection method to return the mocked connection
        dbManager = spy(DBManager.getInstance());
        doReturn(mockConnection).when(dbManager).getConnection();

    }

    @Test
    public void testSaveCustomer() throws Exception {
        // setup() Mocking the necessary objects

        // Arrange
        // When prepareStatement is called on the mockConnection, return mockPreparedStatement
        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);

        // Mock executeUpdate to return 1, indicating a row was inserted
        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        ICustomer mockCustomer = mock(ICustomer.class);
        // Stubbing methods of mockCustomer
        when(mockCustomer.getFirstName()).thenReturn("John");
        when(mockCustomer.getLastName()).thenReturn("Doe");
        // Continue stubbing other methods...

        boolean result = dbManager.saveCustomer(mockCustomer);

        // Verify that the connection and prepared statement were used, and assert the result
        verify(mockConnection, times(1)).prepareStatement(anyString());
        verify(mockPreparedStatement, times(1)).executeUpdate();
        assertTrue(result, "The saveCustomer method should return true when a customer is saved successfully.");
    }

    @Test
    public void testLoginCustomerSuccess() throws Exception {
        // Arrange

        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeQuery()).thenReturn(mockResultSet);
        when(mockResultSet.next()).thenReturn(true); // Simulate finding a user
        // Mocking ResultSet to return expected values
        when(mockResultSet.getInt("customerId")).thenReturn(1);
        when(mockResultSet.getString("firstname")).thenReturn("John");
        when(mockResultSet.getString("lastname")).thenReturn("Doe");
        when(mockResultSet.getString("email")).thenReturn("john.doe@example.com");
        when(mockResultSet.getString("phoneNum")).thenReturn("1234567890");
        when(mockResultSet.getString("address")).thenReturn("123 Main St");
        when(mockResultSet.getString("city")).thenReturn("Anytown");
        when(mockResultSet.getString("province")).thenReturn("Anystate");
        when(mockResultSet.getString("postalCode")).thenReturn("12345");
        when(mockResultSet.getString("country")).thenReturn("AnyCountry");
        when(mockResultSet.getString("userId")).thenReturn("johndoe");
        when(mockResultSet.getString("password")).thenReturn("password");
        when(mockResultSet.getInt("isHolder")).thenReturn(0); // Not an event holder

        ICustomer mockCustomer = mock(ICustomer.class);
        // Act
        mockCustomer = dbManager.loginCustomer("johndoe", "password");

        // Assert
        assertNotNull(mockCustomer, "The result should not be null for a successful login");
        assertEquals("John", mockCustomer.getFirstName(), "The first name should match the mock result set");
        assertEquals("Doe", mockCustomer.getLastName(), "The last name should match the mock result set");
        // More assertions can be added to fully verify the returned Customer object

        // Verify interactions
        verify(mockPreparedStatement, times(1)).executeQuery();
        verify(mockResultSet, atLeastOnce()).getString(anyString());
    }

    @Test
    public void testLoginCustomerFailure() throws SQLException {
        // Arrange
//        Connection mockConnection = mock(Connection.class);
//        PreparedStatement mockPreparedStatement = mock(PreparedStatement.class);
//        ResultSet mockResultSet = mock(ResultSet.class);
//
//        DBManager dbManager = spy(DBManager.getInstance());
//        doReturn(mockConnection).when(dbManager).getConnection();

        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeQuery()).thenReturn(mockResultSet);
        when(mockResultSet.next()).thenReturn(false); // Simulate not finding a user

        // Act
        Customer mockCustomer = dbManager.loginCustomer("nonexistentuser", "wrongpassword");

        // Assert
        assertNull(mockCustomer, "The result should be null for a failed login");

        // Verify interactions
        verify(mockPreparedStatement, times(1)).executeQuery();
        verify(mockResultSet, never()).getString(anyString()); // Ensure getString is never called since no user should be found
    }





    @Test
    public void saveCustomerShouldExecuteUpdateWhenCustomerIsValid() throws Exception {

        ICustomer mockCustomer = mock(ICustomer.class);

        when(mockCustomer.getFirstName()).thenReturn("John");
        when(mockCustomer.getLastName()).thenReturn("Doe");
        when(mockCustomer.getEmail()).thenReturn("john.doe@example.com");
        when(mockCustomer.getPhoneNum()).thenReturn("1234567890");
        when(mockCustomer.getAddress()).thenReturn("123 Street");
        when(mockCustomer.getCity()).thenReturn("Kelowna");
        when(mockCustomer.getProvince()).thenReturn("BC");
        when(mockCustomer.getPostalCode()).thenReturn("12345");
        when(mockCustomer.getCountry()).thenReturn("Canada");
        when(mockCustomer.getUserId()).thenReturn("johndoe");
        when(mockCustomer.getPassword()).thenReturn("password");

        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        dbManager.saveCustomer(mockCustomer);

        verify(mockPreparedStatement, times(1)).executeUpdate();
    }

    @Test
    public void loginCustomerShouldReturnCustomerWhenCredentialsAreValid() throws Exception {
        when(mockResultSet.next()).thenReturn(true);
        when(mockResultSet.getString("firstname")).thenReturn("John");
        when(mockResultSet.getString("lastname")).thenReturn("Doe");
        when(mockResultSet.getString("email")).thenReturn("john.doe@example.com");
        when(mockResultSet.getString("phoneNum")).thenReturn("1234567890");
        when(mockResultSet.getString("address")).thenReturn("123 Street");
        when(mockResultSet.getString("city")).thenReturn("Kelwona");
        when(mockResultSet.getString("province")).thenReturn("BC");
        when(mockResultSet.getString("postalCode")).thenReturn("12345");
        when(mockResultSet.getString("country")).thenReturn("Canada");
        when(mockResultSet.getString("userId")).thenReturn("johndoe");
        when(mockResultSet.getString("password")).thenReturn("password");

        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeQuery()).thenReturn(mockResultSet);
        dbManager.loginCustomer("johndoe", "password");

        verify(mockResultSet, times(1)).next();
    }

    @Test
    public void saveShoppingCartItemShouldExecuteUpdateWhenItemIsValid() throws Exception {
        ShoppingCartItem mockItem = mock(ShoppingCartItem.class);
        when(mockItem.getEventId()).thenReturn(1);
        //when(mockItem.getTicketPrice()).thenReturn(100.0);
        when(mockItem.getTicketNum()).thenReturn(2);
        when(mockItem.isSelected()).thenReturn(true);

        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        dbManager.saveShoppingCartItem(true, 1, mockItem);

        verify(mockPreparedStatement, times(1)).executeUpdate();
    }

    @Test
    public void deleteShoppingCartItemShouldExecuteUpdateWhenCustomerIdAndEventIdAreValid() throws Exception {
        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        dbManager.removeShoppingCartItem(1, 1);

        verify(mockPreparedStatement, times(1)).executeUpdate();
    }

    @Test
    public void saveEventShouldExecuteUpdateWhenEventIsValid() throws Exception {
        Event event = mock(Event.class);
        when(event.getEventId()).thenReturn(1);
        when(event.getEventName()).thenReturn("Event");
        when(event.getEventDate()).thenReturn("2022-12-31");
        when(event.getStartTime()).thenReturn("10:00:00");
        when(event.getEndTime()).thenReturn("12:00:00");
        when(event.getAddress()).thenReturn("123 Street");
        when(event.getTotalTicket()).thenReturn(100);
        when(event.getTicketNum()).thenReturn(50);
        when(event.getTicketPrice()).thenReturn(100.0);

        when(mockConnection.prepareStatement(anyString())).thenReturn(mockPreparedStatement);
        when(mockPreparedStatement.executeUpdate()).thenReturn(1);

        dbManager.saveEvent(event);

        verify(mockPreparedStatement, times(1)).executeUpdate();
    }
}
