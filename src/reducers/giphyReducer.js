import { GET_RANDOM_PIZZA } from "../actions/types";

export default function(
  state = { randomPizzaGif: false },
  action
) {
  switch (action.type) {
    case GET_RANDOM_PIZZA:
      return {
        ...state,
        randomPizzaGif: action.payload
      };
    default:
      return state;
  }
}
