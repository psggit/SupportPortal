import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./container/login/index";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/login" component={Login} />
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));