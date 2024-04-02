package org.pentakill.business;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
public class ShoppingCartTest {

    @Test
    public void testShoppingCart() {
        ShoppingCart shoppingCart = new ShoppingCart(1);
        assertEquals(1, shoppingCart.getCustomerId());
        assertEquals(0, shoppingCart.getTotalAmount());
    }

    @Test
    public void testAddShoppingCartItem() {
        ShoppingCart shoppingCart = new ShoppingCart(1);
        assertTrue(shoppingCart.addShoppingCartItem(1, 10.0, 1, true));
        assertEquals(10.0, shoppingCart.getTotalAmount());
        assertTrue(shoppingCart.addShoppingCartItem(1, 10.0, 1, true));
        assertEquals(20.0, shoppingCart.getTotalAmount());
    }

    @Test
    public void testUpdateTotalAmount() {
        ShoppingCart shoppingCart = new ShoppingCart(1);
        shoppingCart.addShoppingCartItem(1, 10.0, 1, true);
        shoppingCart.addShoppingCartItem(2, 10.0, 1, true);
        //shoppingCart.addShoppingCartItem(1, 10.0, 1, false);
        shoppingCart.updateTotalAmount();
        assertEquals(20.0, shoppingCart.getTotalAmount());
    }

    @Test
    public void testSetTotalAmount() {
        ShoppingCart shoppingCart = new ShoppingCart(1);
        shoppingCart.addShoppingCartItem(1, 10.0, 1, true);
        assertEquals(10.0, shoppingCart.getTotalAmount());
        shoppingCart.setTotalAmount(100.0);
        assertEquals(100.0, shoppingCart.getTotalAmount());
    }

    @Test
    public void testSetCustomerId() {
        ShoppingCart shoppingCart = new ShoppingCart(1);
        assertEquals(1, shoppingCart.getCustomerId());
        shoppingCart.setCustomerId(2);
        assertEquals(2, shoppingCart.getCustomerId());
    }

    @Test
    public void testitemChangeSelectedStatus() {
        ShoppingCart shoppingCart = new ShoppingCart(1);
        shoppingCart.addShoppingCartItem(1, 10.0, 1, true);
        shoppingCart.addShoppingCartItem(2, 10.0, 1, true);
        shoppingCart.addShoppingCartItem(3, 10.0, 1, true);
        assertEquals(30, shoppingCart.getTotalAmount());
        shoppingCart.itemChangeStatus(2, 10.0, 2, true);
        assertEquals(40, shoppingCart.getTotalAmount());
        shoppingCart.itemChangeStatus(1, 10.0, 1, false);
        assertEquals(30, shoppingCart.getTotalAmount());
        shoppingCart.itemChangeStatus(2, 10.0, 2, false);
        assertEquals(10, shoppingCart.getTotalAmount());
        shoppingCart.itemChangeStatus(3, 10.0, 1, false);
        assertEquals(0, shoppingCart.getTotalAmount());
    }


}
