import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// handles the state for the cart item/s.
// takes two parameters, initial state and an action reducer
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case CART_ADD_ITEM:
      // action.payload will have a bunch of stuff in it
      const item = action.payload;

      // for each of the items that are in the current state cart items, check if x.product which is the ID is equal to the current item.product. Meaning that it exists.
      const existItem = state.cartItems.find((x) => x.product === item.product);

      // if exists, map through the current items and for each, if current iteration of current item ID is equal to the existing item.product, then return item for this iteration, else, it will be x.
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
        // if it doesnt exist, push into an array.
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      // return current state and filter out the item to remove from cartItems
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_RESET:
      return {
        cartItems: [],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
