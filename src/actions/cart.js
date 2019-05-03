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
