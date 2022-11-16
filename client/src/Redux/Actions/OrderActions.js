import axios from "axios";
import { COLLECTION_CLEAR_ITEMS } from "../Constants/CollectionConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS } from "../Constants/OrderConstants";
import {logout} from "./UserActions";

//create order
export const createOrder = (order) => async(dispatch,getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `http://localhost:8000/api/orders`,
        order,
        config
      );
  
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: COLLECTION_CLEAR_ITEMS, payload: data });
      
      localStorage.removeItem("collectionItems")
      
    } catch (error) {
      const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if(message === "Not authorized, provide token"){
          dispatch(logout())
        }
  
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message
      });
    }
  }

  //details order
export const getOrderDetails = (id) => async(dispatch,getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/api/orders/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    const message =  error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      if(message === "Not authorized, provide token"){
        dispatch(logout())
      }

    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    });
  }
}

  // user order list
  export const getListMyOrders = () => async(dispatch,getState) => {
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(
        `http://localhost:8000/api/orders`,
        config
      );
  
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  
    } catch (error) {
      const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if(message === "Not authorized, provide token"){
          dispatch(logout())
        }
  
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message
      });
    }
  }