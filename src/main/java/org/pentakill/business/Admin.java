package org.pentakill.business;

import java.util.List;

public class Admin {
    private int adminId;
    private String userName;
    private String password;
    private List<Event> eventList;

    public Admin(int adminId, String userName, String password, List<Event> eventList) {
        this.adminId = adminId;
        this.userName = userName;
        this.password = password;
        this.eventList = eventList;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setEventList(List<Event> eventList) {
        this.eventList = eventList;
    }

    public List<Event> getEventList() {
        return eventList;
    }

    public boolean verifyEvent(List<Event> eventList, Event event, boolean verified) {
        boolean eventExist = false;
        for (int i = 0; i < eventList.size(); i++) {
            if (event == eventList.get(i)) {
                eventExist = true;
            }
        }
        if (eventExist) {
            return verified;
        }
        return false;
    }
}