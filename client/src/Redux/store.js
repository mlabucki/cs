import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReviewReducer,
} from "./Reducers/ProductReducers";
import { collectionReducer } from "./Reducers/CollectionReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./Reducers/UserReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
} from "./Reducers/OrderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  collection: collectionReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
});

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  //save details 
const collectionDetailsFromLocalStorage = localStorage.getItem("collectionDetails")
  ? JSON.parse(localStorage.getItem("collectionDetails"))
  : null;

const collectionItemsFromLocalStorage = localStorage.getItem("collectionItems")
  ? JSON.parse(localStorage.getItem("collectionItems"))
  : [];

const initialState = {
  collection: {
    collectionDetails: collectionDetailsFromLocalStorage,
    collectionItems: collectionItemsFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
