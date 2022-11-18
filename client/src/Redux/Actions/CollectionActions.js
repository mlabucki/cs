import axios from "axios";
import {
  COLLECTION_ADD_ITEM,
  COLLECTION_REMOVE_ITEM,
  COLLECTION_SAVE_DETAILS,
} from "../Constants/CollectionConstants";

export const addToCollection = (_id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products/${_id}`
  );

  dispatch({
    type: COLLECTION_ADD_ITEM,
    payload: {
      product: data._id,
      title: data.title,
      image: data.image,
      text: data.text,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    "collectionItems",
    JSON.stringify(getState().collection.collectionItems)
  );
};

//remove products from collection
export const removeFromCollection = (_id) => (dispatch, getState) => {
  dispatch({
    type: COLLECTION_REMOVE_ITEM,
    payload: _id,
  });
  localStorage.setItem(
    "collectionItems",
    JSON.stringify(getState().collection.collectionItems)
  );
};

//save Collection details
export const saveCollectionDetails = (data) => (dispatch) => {
  dispatch({
    type: COLLECTION_SAVE_DETAILS,
    payload: data,
  });

  localStorage.setItem("collectionDetails", JSON.stringify(data));
};
