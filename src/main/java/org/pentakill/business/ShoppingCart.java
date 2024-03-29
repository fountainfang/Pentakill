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
        //result = DBManager.getInstance().saveShoppingCartItem(inCart,customerId,newCartItem);
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

    public void updateTotalAmount(){
        double amount = 0;
        for(ShoppingCartItem item: shoppingCartItems){
            if(item.isSelected()){
                amount += item.getTicketPrice() * item.getTicketNum();
            }
        }
        setTotalAmount(amount);
    }

    public boolean itemChangeSelectedStatus(int eventId, double ticketPrice, int newTicketNum, boolean selectedStatus){
        boolean result = false;
        for(ShoppingCartItem item: shoppingCartItems){
            if(item.getEventId() == eventId){
                item.setTicketNum( newTicketNum);
                item.setSelected(selectedStatus);
                break;
            }
        }
        //result = DBManager.getInstance().saveShoppingCartItem(true,customerId,eventId,ticketPrice,newTicketNum,selectedStatus);
        updateTotalAmount();
        return result;
    }

    public Order placeOrder(List<PayMethod> payMethods) {
        // todo Logic to convert shopping cart to an order using the specified payment method
        // Verify payment details, process payment, finalize order details
        return new Order();
    }

}
