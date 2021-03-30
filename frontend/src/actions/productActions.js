import axios from 'axios';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CAT_BOWL_REQUEST,
  PRODUCT_CAT_BOWL_SUCCESS,
  PRODUCT_CAT_BOWL_FAIL,
  PRODUCT_CAT_SET_REQUEST,
  PRODUCT_CAT_SET_SUCCESS,
  PRODUCT_CAT_SET_FAIL,
  PRODUCT_CAT_CUTLERY_REQUEST,
  PRODUCT_CAT_CUTLERY_SUCCESS,
  PRODUCT_CAT_CUTLERY_FAIL,
} from '../constants/productConstants';

// ACTION CREATORS ->

// Action creator for all products
// Redux Thunk allows adding a function within a function->
// ...listProducts = () => async (dispatch) => {}
export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  // try/catch statement used to distinguish between responses.
  try {
    // action type
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // request to api/products
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    // if the response is OK, dispatch product list success
    dispatch({
      // action type
      type: PRODUCT_LIST_SUCCESS,
      // attach payload
      payload: data,
    });
  } catch (error) {
    // if the response isn't OK, dispatch object type product list fail
    dispatch({
      // action type
      type: PRODUCT_LIST_FAIL,
      // attach payload
      payload:
        // check for generic server error && a custom one
        error.response && error.response.data.message
          ? // if custom, display custom
            error.response.data.message
          : // if not, display server error
            error.message,
    });
  }
};

// Action creator details of a product
export const listProductDetails = (id) => async (dispatch) => {
  // try/catch used to distinguish between responses.
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator create a product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator update a product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator review a product
export const reviewProduct = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator for top products
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator for category bowl
export const listCatBowlProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CAT_BOWL_REQUEST });

    const { data } = await axios.get(`/api/products/bowls`);

    dispatch({
      type: PRODUCT_CAT_BOWL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CAT_BOWL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator for category set
export const listCatSetProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CAT_SET_REQUEST });

    const { data } = await axios.get(`/api/products/set`);

    dispatch({
      type: PRODUCT_CAT_SET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CAT_SET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action creator for category cutlery
export const listCatCutleryProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CAT_CUTLERY_REQUEST });

    const { data } = await axios.get(`/api/products/cutlery`);

    dispatch({
      type: PRODUCT_CAT_CUTLERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CAT_CUTLERY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
