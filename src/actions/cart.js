import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = pizza => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: pizza
  });
};

export const removeFromCart = id => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    id
  });
};

/*
 - The above actions are written as 'thunks' only out of habit, in these cases they only need to be written like:


export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    id
  };
};

 - No need to return a dispatch function there which triggers the redux-thunk middleware to look for a promise to resolve or condition to be met

 - Later actions should be added for calculating totals and adding and removing discounts, the latter could be placed in a discounts action/reducer but the need for that is based on the overall complexity of the system... is it really a necessary thing

 */
