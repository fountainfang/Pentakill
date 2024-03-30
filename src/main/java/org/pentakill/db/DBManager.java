package org.pentakill.db;

import org.pentakill.business.*;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class DBManager {

    // private String DBLINK =
    // "jdbc:sqlserver://cosc310_sqlserver:1433;DatabaseName=events;TrustServerCertificate=True";
    private String DBLINK = "jdbc:sqlserver://localhost:3306;DatabaseName=pentakill;TrustServerCertificate=True";
    private String UID = "root";
    // private String PWD = "310#sa#pw";
    private String PWD = "";
    private String DRIVER_CLASS = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static DBManager dbmgr;

    protected DBManager() {
    }

    public static DBManager getInstance() {
        if (dbmgr == null) {
            dbmgr = new DBManager();
        }
        return dbmgr;
    }

    protected Connection getConnection() throws SQLException {
        Connection conn = null;
        try { // Load driver class
            Class.forName(DRIVER_CLASS);
        } catch (java.lang.ClassNotFoundException e) {
            throw new SQLException("ClassNotFoundException: " + e);
        }
        conn = DriverManager.getConnection(DBLINK, UID, PWD);
        return conn;
    }

    protected void closeConnection(Connection conn) {
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean saveCustomer(ICustomer aCustomer) {
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement(
                    "INSERT INTO Customer ( firstname, lastname, email, phoneNum, address,city,province,postalCode,country,userId,password,isHolder) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)");
            // ps.setInt(1, aCustomer.getCustomerId());
            ps.setString(1, aCustomer.getFirstName());
            ps.setString(2, aCustomer.getLastName());
            ps.setString(3, aCustomer.getEmail());
            ps.setString(4, aCustomer.getPhoneNum());
            ps.setString(5, aCustomer.getAddress());
            ps.setString(6, aCustomer.getCity());
            ps.setString(7, aCustomer.getProvince());
            ps.setString(8, aCustomer.getPostalCode());
            ps.setString(9, aCustomer.getCountry());
            ps.setString(10, aCustomer.getUserId());
            ps.setString(11, aCustomer.getPassword());
            if (aCustomer instanceof EventHolder) {
                ps.setInt(12, 1);
            } else {
                ps.setInt(12, 0);
            }
            int i = ps.executeUpdate();
            if (i == 1) {
                result = true;
            }
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public Customer loginCustomer(String userId, String password) {
        Customer result = null;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement("SELECT * FROM Customer WHERE userId = ? AND password = ?");
            ps.setString(1, userId);
            ps.setString(2, password);
            rs = ps.executeQuery();
            if (rs.next()) {
                if (rs.getInt("isHolder") == 1) {
                    result = new EventHolder();
                } else {
                    result = new Customer();
                }
                result.setCustomerId(rs.getInt("customerId"));
                result.setFirstName(rs.getString("firstname"));
                result.setLastName(rs.getString("lastname"));
                result.setEmail(rs.getString("email"));
                result.setPhoneNum(rs.getString("phoneNum"));
                result.setAddress(rs.getString("address"));
                result.setCity(rs.getString("city"));
                result.setProvince(rs.getString("province"));
                result.setPostalCode(rs.getString("postalCode"));
                result.setCountry(rs.getString("country"));
                result.setUserId(rs.getString("userId"));
                result.setPassword(rs.getString("password"));
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public boolean saveShoppingCartItem(boolean isUpdated, int customerId, ShoppingCartItem item) {
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            int intValueforIsSelected = 0;
            if (item.isSelected()) {
                intValueforIsSelected = 1;
            }
            if (isUpdated) {
                ps = conn.prepareStatement(
                        "UPDATE incart SET TicketNum = ? , isSelected = ? WHERE customerId = ? AND eventId = ?");
                ps.setInt(1, item.getTicketNum());
                ps.setInt(2, intValueforIsSelected);
                ps.setInt(2, customerId);
                ps.setInt(3, item.getEventId());
            } else {
                ps = conn.prepareStatement(
                        "INSERT INTO incart (customerId, eventId, ticketPrice, ticketNum, isSelected) VALUES (?, ?, ?, ?, ?)");
                ps.setInt(1, customerId);
                ps.setInt(2, item.getEventId());
                ps.setDouble(3, item.getTicketPrice());
                ps.setInt(4, item.getTicketNum());
                ps.setInt(5, intValueforIsSelected);
            }
            int i = ps.executeUpdate();
            if (i == 1) {
                result = true;
            }
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public boolean deleteShoppingCartItem(int customerId, int eventId) {
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement("DELETE FROM incart WHERE customerId = ? AND eventId = ?");
            ps.setInt(1, customerId);
            ps.setInt(2, eventId);
            int i = ps.executeUpdate();
            if (i == 1) {
                result = true;
            }
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public boolean saveEvent(Event event) {
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement(
                    "INSERT INTO Event (eventId, eventName, eventDesc,eventDate, startTime,endTime,address, totalTicket,ticketNum, ticketPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setInt(1, event.getEventId());
            ps.setString(2, event.getEventName());
            ps.setString(3, event.getEventDesc());
            ps.setString(4, event.getEventDate());
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            Time startTime = new Time(sdf.parse(event.getStartTime()).getTime());
            Time endTime = new Time(sdf.parse(event.getEndTime()).getTime());
            ps.setTime(4, startTime);
            ps.setTime(5, endTime);
            ps.setString(6, event.getAddress());
            ps.setInt(7, event.getTotalTicket());
            ps.setInt(8, event.getTicketNum());
            ps.setDouble(9, event.getTicketPrice());
            int i = ps.executeUpdate();
            if (i == 1) {
                result = true;
            }
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public int updateEventRating(int eventId) {
        Connection conn = null;
        PreparedStatement ps1 = null;
        PreparedStatement ps2 = null;
        int eventRating = 0;
        try {
            conn = getConnection();
            ps1 = conn.prepareStatement(
                    "SELECT AVG(reviewRating) AS averageRating FROM review WHERE eventId = ? GROUP BY eventId");
            ps1.setInt(1, eventId);
            ResultSet rs = ps1.executeQuery();
            if (rs.next()) {
                eventRating = rs.getInt("averageRating");
            }
            rs.close();
            ps1.close();
            if (eventRating != 0) {
                ps2 = conn.prepareStatement("UPDATE Event SET eventRating = ? WHERE eventId = ?");
                ps2.setInt(1, eventRating);
                ps2.setInt(2, eventId);
                int i = ps2.executeUpdate();
                ps2.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return eventRating;
    }

    public List<Event> getEventsSummary() {
        List<Event> result = null;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement("SELECT eventId,eventName,eventCategory,ticketPrice,eventRating FROM Event");
            rs = ps.executeQuery();
            while (rs.next()) {
                if (result == null) {
                    result = new ArrayList<Event>();
                }
                Event event = new Event();
                event.setEventId(rs.getInt("EventId"));
                event.setEventName(rs.getString("EventName"));
                event.setTicketPrice(rs.getDouble("TicketPrice"));
                event.setEventRating(rs.getInt("EventRating"));
                result.add(event);
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public Event getEventDetail(int eventId) {
        Event result = null;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement("SELECT * FROM Event WHERE eventId = ?");
            ps.setInt(1, eventId);
            rs = ps.executeQuery();
            if (rs.next()) {
                result = new Event();
                result.setEventId(eventId);
                result.setEventName(rs.getString("EventName"));
                result.setEventCategory(rs.getString("EventCategory"));
                result.setEventDesc(rs.getString("EventDesc"));
                result.setEventDate(rs.getString("EventDate"));
                Time startTime = rs.getTime("StartTime");
                Time endTime = rs.getTime("EndTime");
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
                result.setStartTime(sdf.format(startTime));
                result.setEndTime(sdf.format(endTime));
                result.setAddress(rs.getString("Address"));
                result.setTotalTicket(rs.getInt("TotalTicket"));
                result.setTicketNum(rs.getInt("TicketNum"));
                result.setTicketPrice(rs.getDouble("TicketPrice"));
            }
            rs.close();
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    // table OrderSummary
    // orderId INT IDENTITY,
    // orderDate DATETIME,
    // totalAmount DECIMAL(10,2),
    // email VARCHAR(50),
    // customerId INT,
    // table orderEvent
    // orderId INT,
    // eventId INT,
    // TicketPrice DECIMAL(10,2),
    // TicketNum INT,
    // todo finish saveOrder and OrderDetail
    public boolean saveOrder(int orderId, java.util.Date orderDate, double totalAmount, String email, int customerId,
            List<ShoppingCartItem> items) {
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        boolean saveOrder, saveOrderDetail;
        try {
            conn = getConnection();
            ps = conn.prepareStatement(
                    "INSERT INTO Ordersummary (customerId, eventId, ticketNum, totalPrice) VALUES (?, ?, ?, ?)");
            ps.setInt(1, orderId);
            ps.setDate(2, new java.sql.Date(orderDate.getTime()));
            ps.setDouble(3, totalAmount);
            ps.setString(4, email);
            ps.setInt(5, customerId);
            int i = ps.executeUpdate();
            if (i == 1) {
                saveOrder = true;
            }
            ps.close();
            // todo save data to table orderEvent
            ps = conn.prepareStatement("UPDATE Event SET TicketNum = TicketNum - ? WHERE EventId = ?");

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public int saveRating(int orderId, int eventId, int reviewRating, String reviewDate, int customerId,
            String reviewComment) {
        int result = 0;
        boolean saveReview = false;
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement(
                    "INSERT INTO review (orderId, eventId, reviewRating, reviewDate, customerId, reviewComment) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, orderId);
            ps.setInt(2, eventId);
            ps.setInt(3, reviewRating);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime localDateTime = LocalDateTime.parse(reviewDate, formatter);
            ps.setTimestamp(4, java.sql.Timestamp.valueOf(localDateTime));
            ps.setInt(5, customerId);
            ps.setString(6, reviewComment);
            int i = ps.executeUpdate();
            if (i == 1) {
                saveReview = true;
            }
            ps.close();
        } catch (SQLException e) {
            e.printStackTrace();

        } finally {
            closeConnection(conn);
        }
        if (saveReview) {
            result = updateEventRating(eventId);
        }
        return result;
    }

}
