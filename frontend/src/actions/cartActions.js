import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// ACTION CREATORS ->

// add to cart action, takes id and qty
// Redux Thunk allows adding a function within a function->
// ...addToCart = (id, qty) => async (dispatch, getState) => {}
// passing getState allows getting the entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // saving the cart in localstorage. To save the entire cart, I am using getState that allows to do so. Use JSON.stringify because I can only save strings in localstorage. When taking it out in store.js, I will need to use JSON.parse to pass it back to JavaScript
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // set updated localstorage content
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// add shipping info to localstorage
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // set localstorage content
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// add payment info to localstorage
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // set localstorage content
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
