import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemInCart = state.cartItems.find(
        (i) => i.product === item.product || false
      );

      if (isItemInCart)
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemInCart.product ? item : i
          ),
        };
      else
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
