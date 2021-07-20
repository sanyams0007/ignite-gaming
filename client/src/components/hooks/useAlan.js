import alanBtn from "@alan-ai/alan-sdk-web";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../../actions/cartActions";

const COMMANDS = {
  OPEN_CART: "open-cart",
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  REMOVE_ALL_ITEMS: "remove-all-items",
  GO_FOR_CHECKOUT: "go-for-checkout",
};

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);

  /* Opens carts */
  const openCart = useCallback(() => {
    if (cartItems.length >= 1) {
      alanInstance.playText("Opening cart");
      history.push("/cart");
    } else alanInstance.playText("You have no items in your cart");
  }, [alanInstance, cartItems, history]);

  //command: add-item, payload: name: Battlefield 4, quantity: 1

  /* Adds item to cart on user voice command */
  const addItem = useCallback(
    ({ detail: { name, quantity } }) => {
      const item = products.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      );

      console.log(name, item);
      if (item == null) {
        alanInstance.playText(`I cannot find item named ${name}.`);
      } else {
        dispatch(addItemToCart(item._id, quantity));
        alanInstance.playText(
          `Added ${quantity} of the ${name} item to your cart.`
        );
      }
    },
    [alanInstance, addItemToCart]
  );

  /* Removes item from cart on user voice command */
  const removeItem = useCallback(
    ({ detail: { name } }) => {
      const item = cartItems.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      );

      if (item == null) {
        alanInstance.playText(`I cannot find item ${name} in the cart.`);
      } else {
        dispatch(removeItemFromCart(item.product));
        alanInstance.playText(`Removed the ${name} item from your cart.`);
      }
    },
    [alanInstance, cartItems, removeItemFromCart]
  );

  /* Clear cart */
  const removeAllItems = useCallback(() => {
    dispatch(clearCart());
    alanInstance.playText(`Cleared your cart.`);
  }, [alanInstance, clearCart]);

  /* Proceed to Checkout */
  const goForCheckout = useCallback(() => {
    if (cartItems.length >= 1) {
      user
        ? alanInstance.playText("There you go!")
        : alanInstance.playText("Please login to continue");
      history.push("/checkout");
    } else alanInstance.playText("You have no items in your cart");
  }, [alanInstance, cartItems, history]);

  /* effect for dispatching/creating and clearing custom events */
  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, openCart);
    window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem);
    window.addEventListener(COMMANDS.REMOVE_ALL_ITEMS, removeAllItems);
    window.addEventListener(COMMANDS.GO_FOR_CHECKOUT, goForCheckout);

    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, openCart);
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
      window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem);
      window.removeEventListener(COMMANDS.REMOVE_ALL_ITEMS, removeAllItems);
      window.removeEventListener(COMMANDS.GO_FOR_CHECKOUT, goForCheckout);
    };
  }, [openCart, addItem, removeItem, removeAllItems, goForCheckout]);

  /* effect for creating Alan instance only once app starts */
  useEffect(() => {
    if (alanInstance != null) return;

    setAlanInstance(
      alanBtn({
        top: "110px",
        left: "20px",
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, payload }) => {
          // Call the client code that will react to the received command
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, []);

  return null;
}
