import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { getRandomPizzaGif } from "../actions/giphy";

// ROUTE COMPONENTS
import Home from "./Home";
import Build from "./Build";

class App extends Component {
  componentDidMount() {
    this.props.getRandomPizzaGif();
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/build" component={Build} />
      </Switch>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRandomPizzaGif: () => dispatch(getRandomPizzaGif())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
