import {
  COLLECTION_ADD_ITEM,
  COLLECTION_REMOVE_ITEM,
  COLLECTION_CLEAR_ITEMS,
  COLLECTION_SAVE_DETAILS,
} from "../Constants/CollectionConstants";

export const collectionReducer = (
  state = { collectionItems: [], collectionDetails: {} },
  action
) => {
  switch (action.type) {
    case COLLECTION_ADD_ITEM:
      const item = action.payload;

      const existItem = state.collectionItems.find(
        (i) => i.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          collectionItems: state.collectionItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          collectionItems: [...state.collectionItems, item],
        };
      }
    case COLLECTION_REMOVE_ITEM:
      return {
        ...state,
        collectionItems: state.collectionItems.filter(
          (i) => i.product !== action.payload
        ),
      };
    case COLLECTION_SAVE_DETAILS:
      return {
        collectionDetails: action.payload,
      };

    case COLLECTION_CLEAR_ITEMS:
      return {
        ...state,
        collectionItems: [],
      };
    default:
      return state;
  }
};
