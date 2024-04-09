package org.pentakill.business;

import org.pentakill.db.DBManager;
import  java.util.ArrayList;
import java.util.List;

public class ShoppingCart {

    private int customerId;
    private ArrayList<ShoppingCartItem> shoppingCartItems;
    private double totalAmount;

    public ShoppingCart(int customerId){
        setCustomerId(customerId);
        shoppingCartItems = new ArrayList<ShoppingCartItem>();
        totalAmount = 0;
    }

    public boolean addShoppingCartItem(int eventId, double tickectPrice,int ticketNum, boolean isSelected){
        boolean result = false;
        boolean inCart = false;
        ShoppingCartItem newCartItem= null;
        for(ShoppingCartItem item: shoppingCartItems){
            if(item.getEventId() == eventId){
                inCart = true;
                int newNum = item.getTicketNum() + ticketNum;
                item.setTicketNum(newNum);
                newCartItem = item;
                break;
            }
        }
        if(!inCart) {
            newCartItem = new ShoppingCartItem(eventId, tickectPrice, ticketNum, isSelected);
            shoppingCartItems.add(newCartItem);

        }
        //When you run unit test, you need to comment out the below line and uncomment the next line "result = true"
        result = DBManager.getInstance().saveShoppingCartItem(inCart,customerId,newCartItem);
        result = true;
        updateTotalAmount();
        return result;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public List<ShoppingCartItem> getShoppingCartItems() {
        return shoppingCartItems;
    }

    public void updateTotalAmount(){
        double amount = 0;
        for(ShoppingCartItem item: shoppingCartItems){
            if(item.isSelected()){
                amount += item.getTicketPrice() * item.getTicketNum();
            }
        }
        setTotalAmount(amount);
    }

    public boolean itemChangeStatus(int eventId, double ticketPrice, int newTicketNum, boolean selectedStatus){
        boolean result = false;
        for(ShoppingCartItem item: shoppingCartItems){
            if(item.getEventId() == eventId){
                item.setTicketPrice(ticketPrice);
                item.setTicketNum( newTicketNum);
                item.setSelected(selectedStatus);
                result = DBManager.getInstance().saveShoppingCartItem(true,customerId,item);
                break;
            }
        }
        updateTotalAmount();
        return result;
    }

    public boolean removeShoppingCartItem(int eventId){
        boolean result = false;
        ShoppingCartItem itemToRemove = null;
        for(ShoppingCartItem item: shoppingCartItems){
            if(item.getEventId() == eventId){
                itemToRemove = item;
                break;
            }
        }
        if(itemToRemove != null){
            shoppingCartItems.remove(itemToRemove);
            result = DBManager.getInstance().removeShoppingCartItem(customerId,eventId);
            updateTotalAmount();
        }
        return result;
    }

    public boolean clearShoppingCart() {
        boolean result = false;
        ArrayList<ShoppingCartItem> newList = new ArrayList<ShoppingCartItem>();
        for (ShoppingCartItem item : shoppingCartItems) {
            if (!item.isSelected()) {
                newList.add(item);
            }else {
                result = DBManager.getInstance().removeShoppingCartItem(customerId, item.getEventId());
            }
        }
        shoppingCartItems = newList;
        updateTotalAmount();
        return result;
    }
}
