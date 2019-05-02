import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import giphyReducer from "./giphyReducer";

export default combineReducers({
	cart: cartReducer,
	giphy: giphyReducer,
	pizzasBySize: (state = {}) => state,
	toppingsBySize: (state = {}) => state,
	pizzaSizes: (state = {}) => state
});
