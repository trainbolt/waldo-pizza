import axios from "axios";
import { GET_RANDOM_PIZZA } from "./types";

const giphyHost = "//api.giphy.com";
const giphyApiKey = "DwDE713ufsjibHSrbgOQioH6xM7GnRdY";

export function getRandomPizzaGif() {
  return async dispatch => {
    const res = await axios.get(
      `${giphyHost}/v1/gifs/random?tag=pizza&rating=g&api_key=${giphyApiKey}`
    );
    dispatch({
      type: GET_RANDOM_PIZZA,
      payload: res.data.data
    });
  };
}
