package org.pentakill.db;
import org.pentakill.business.Customer;
import org.pentakill.business.EventHolder;

import java.sql.*;

public final class DBManager {

    private String DBLINK = "jdbc:sqlserver://cosc310_sqlserver:1433;DatabaseName=events;TrustServerCertificate=True";
    private String UID = "sa";
    private String PWD = "310#sa#pw";

    private String DRIVER_CLASS = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static DBManager dbmgr;
    private DBManager() {}

    public static DBManager getInstance() {
        if(dbmgr == null) {
            dbmgr = new DBManager();
        }
        return dbmgr;
    }

    private Connection getConnection() throws SQLException {
        Connection conn = null;
        try {	// Load driver class
            Class.forName(DRIVER_CLASS);
        } catch (java.lang.ClassNotFoundException e){
            throw new SQLException("ClassNotFoundException: " + e);
        }
        conn = DriverManager.getConnection(DBLINK, UID, PWD);
        return conn;
    }

    private void closeConnection(Connection conn) {
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean saveCustomer(Customer aCustomer){
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement("INSERT INTO Customer (customerId, firstname, lastname, email, phoneNum, address,city,state,postalCode,country,userid,password,isHolder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)");
            ps.setInt(1, aCustomer.getCustomerId());
            ps.setString(2, aCustomer.getFirstName());
            ps.setString(3, aCustomer.getLastName());
            ps.setString(4, aCustomer.getEmail());
            ps.setString(5, aCustomer.getPhoneNum());
            ps.setString(6, aCustomer.getAddress());
            ps.setString(7, aCustomer.getCity());
            ps.setString(8, aCustomer.getState());
            ps.setString(9, aCustomer.getPostalCode());
            ps.setString(10, aCustomer.getCountry());
            ps.setString(11, aCustomer.getUserid());
            ps.setString(12, aCustomer.getPassword());
            if(aCustomer instanceof EventHolder) {
                ps.setInt(13, 1);
            }
            else {
                ps.setInt(13, 0);
            }
            int i = ps.executeUpdate();
            if (i == 1) {
                result = true;
            }
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            closeConnection(conn);
        }
        return result;
    }


}
