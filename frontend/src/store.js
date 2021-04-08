// StoreJS is used to connect all of the reducers and middleware.
// createStore creates a store, combineReducers used to link reducers, applyMiddleware used to apply middleware such as Thunk
import { createStore, combineReducers, applyMiddleware } from 'redux';
// allows creation of asynchronous requests in action creators
import thunk from 'redux-thunk';
// required for browser extension to work together
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewReducer,
  productTopRatedReducer,
  productCatBowlReducer,
  productCatCutleryReducer,
  productCatSetReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers';

// set combineReducer to reducer constant and pass an object with each reducer
const reducer = combineReducers({
  // var for piece of state: the reducer ->
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,
  productTopRated: productTopRatedReducer,
  productCatBowl: productCatBowlReducer,
  productCatSet: productCatSetReducer,
  productCatCutlery: productCatCutleryReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

// USE JSON.parse to pass it back to JavaScript

// If there is a object in local storage, get it and if not, get empty array
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// If there is a object in local storage, get it and if not, get nothing
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// If there is a object in local storage, get it and if not, get empty object
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// If there is a object in local storage, get it and if not, get empty object
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};

// If I want something to be loaded when the Rudux store initially loads, it can go below as an initial state, i.e. previously logged in user.
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// set create store to store constant and pass reducer as first argument, then initialState and the composeWithDevTools that takes applyMiddleware as the parameter.
// There is only thunk but if there was more middlewares, I just need to add them to the array hence the reason for spreadding the const middleware (...middleware).
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// export store
export default store;
