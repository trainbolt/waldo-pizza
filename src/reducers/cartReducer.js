import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const initialState = {
  pizzas: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        pizzas: state.pizzas.concat(action.payload)
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        pizzas: state.pizzas.filter(pizza => pizza.id !== action.id)
      };
    default:
      return state;
  }
}
