import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import gql from "graphql-tag";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

// Bootstrap UI ... standard issue
import "bootstrap/dist/css/bootstrap.css";

// Components
import App from "./components/App";

// Reducers
import rootReducer from "./reducers";

// Apollo Client Connection
const client = new ApolloClient({
  uri: "https://core-graphql.dev.waldo.photos/pizza"
});

// Initial Data
client
  .query({
    query: gql`
      {
        pizzaSizes {
          name
          maxToppings
          toppings {
            topping {
              name
              price
            }
            defaultSelected
          }
          basePrice
        }
      }
    `
  })
  .then(data => {
    const pizzaData = data.data.pizzaSizes;
    const pizzasBySize = pizzaData.reduce((obj, item) => {
      obj[item.name] = item;
      return obj;
    }, {});
    const pizzaSizes = Object.keys(pizzasBySize);
    const toppingsBySize = pizzaData.reduce((a, item) => {
      a[item.name] = item.toppings;
      return a;
    }, {});

    // Initial State
    const initialState = {
      giphy: {},
      pizzasBySize,
      toppingsBySize,
      pizzaSizes
    };

    // Create Store
    const store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(reduxThunk))
    );

    someAsyncCall().then(function(response) {
      store.dispatch(someActionCreator(response));
    });

    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Route path="/" component={App} />
          </Router>
        </Provider>
      </ApolloProvider>,
      document.getElementById("root")
    );
  })
  .catch(error => console.error("ERROR: ", error));

render(<div>Show Loading Screen ...</div>, document.getElementById("root"));

/*
 - There are obvious other ways to load data... in this example we show a load screen while initialState is being hydrated
 - Moving forward from the prototype I would instead include a LOADING_DATA action handler which would allow us to show a loading screen without the use of different render calls above
 - Also, we could dispatch the LOADING_DATA action prior to the async query above, which would then dispatch a DATA_LOADED type of action when the promise is resolved
 */
