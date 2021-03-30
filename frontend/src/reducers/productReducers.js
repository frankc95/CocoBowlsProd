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
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
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

// handles the state for the product list.
// takes two parameters, initial state and an action reducer
export const productListReducer = (state = { products: [] }, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // start loader, request products
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        // stop loader
        loading: false,
        // return product list
        products: action.payload.products,
        // paginate
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = { products: [] }
      return state;
  }
};

// handles the state for the product details.
// takes two parameters, initial state and an action reducer
export const productDetailsReducer = (
  state = { product: { reviews: [], images: [] } },
  action
) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // start loader, spread current state
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      // stop loader, return product details
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = { product: { reviews: [], images: [] } }
      return state;
  }
};

// handles the state for removing the product.
// takes two parameters, initial state and an action reducer
export const productDeleteReducer = (state = {}, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      // start loader
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      // stop loader, return success boolean
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = {}
      return state;
  }
};

// handles the state for creating a sample product.
// takes two parameters, initial state and an action reducer
export const productCreateReducer = (state = {}, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      // start loader
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      // stop loader, return success boolean and created sample product
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      // clear the state
      return {};
    default:
      // return initial state -> state = {}
      return state;
  }
};

// handles the state for updating the sample product.
// takes two parameters, initial state and an action reducer
export const productUpdateReducer = (state = { product: {} }, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      // start loader
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      // stop loader, return success boolean and updated sample product
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      // clear state
      return { product: {} };
    default:
      // return initial state -> state = { product: {} }
      return state;
  }
};

// handles the state for creating a product review.
// takes two parameters, initial state and an action reducer
export const productReviewReducer = (state = {}, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      // start loader
      return { loading: true };
    case PRODUCT_REVIEW_SUCCESS:
      // stop loader, return success boolean
      return { loading: false, success: true };
    case PRODUCT_REVIEW_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_RESET:
      // clear state
      return {};
    default:
      // return initial state -> state = { product: {} }
      return state;
  }
};

// handles the state for fetching top rated products.
// takes two parameters, initial state and an action reducer
export const productTopRatedReducer = (state = { products: [] }, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      // start loader
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      // stop loader, return top rated products
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = { product: [] }
      return state;
  }
};

// handles the state for fetching bowl category products.
// takes two parameters, initial state and an action reducer
export const productCatBowlReducer = (state = { products: [] }, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_CAT_BOWL_REQUEST:
      // start loader
      return { loading: true, products: [] };
    case PRODUCT_CAT_BOWL_SUCCESS:
      // stop loader, return bowl category products
      return { loading: false, products: action.payload };
    case PRODUCT_CAT_BOWL_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = { product: [] }
      return state;
  }
};

// handles the state for fetching set category products.
// takes two parameters, initial state and an action reducer
export const productCatSetReducer = (state = { products: [] }, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_CAT_SET_REQUEST:
      // start loader
      return { loading: true, products: [] };
    case PRODUCT_CAT_SET_SUCCESS:
      // stop loader, return set category products
      return { loading: false, products: action.payload };
    case PRODUCT_CAT_SET_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = { product: [] }
      return state;
  }
};

// handles the state for fetching cutlery category products.
// takes two parameters, initial state and an action reducer
export const productCatCutleryReducer = (state = { products: [] }, action) => {
  // ACTUAL ACTIONS ->
  // use switch to evaluate the type of action
  switch (action.type) {
    case PRODUCT_CAT_CUTLERY_REQUEST:
      // start loader
      return { loading: true, products: [] };
    case PRODUCT_CAT_CUTLERY_SUCCESS:
      // stop loader, return cutlery category products
      return { loading: false, products: action.payload };
    case PRODUCT_CAT_CUTLERY_FAIL:
      // stop loader, return error message
      return { loading: false, error: action.payload };
    default:
      // return initial state -> state = { product: [] }
      return state;
  }
};
