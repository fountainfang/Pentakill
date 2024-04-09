package org.pentakill.web;

import javax.servlet.http.*;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import org.pentakill.business.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pentakill.db.DBManager;

import java.io.BufferedReader;

public class BaseServlet extends HttpServlet {

    DBManager dbManager;

    CustomerFactory customerFactory;

    public String getJsonfromRequest(HttpServletRequest request) throws Exception{
        String result = null;
        StringBuilder inputStringBuilder = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            inputStringBuilder.append(line);
        }
        result = inputStringBuilder.toString();
        return result;
    }

    public void writeResponse(HttpServletResponse response,  ObjectNode responseMessage) throws Exception {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(responseMessage);
        response.getWriter().flush();
    }

    public void writeResponseNeedLogin(HttpServletResponse response) throws Exception {
        ObjectNode responseMessage = JsonNodeFactory.instance.objectNode();
        responseMessage.put("success", false);
        responseMessage.put("message", "Need to login first.");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().print(responseMessage);
        response.getWriter().flush();
    }

    @Override
    public void init() {
        dbManager = DBManager.getInstance();
        customerFactory = CustomerFactory.getInstance();
    }

    public void setDBManager(DBManager dbManager) {
        this.dbManager = dbManager;
    }
}
