import React, { Component } from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
// import "pooper/dist/js/popper.min.js";
// import "bootstrap.bundle.min.js / bootstrap.bundle.js";
import "popover/package.json";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import UserComponents from "./components/UserComponents";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setAccessToken = (accessTokenParam) => {
    localStorage.setItem("accessToken", accessTokenParam);
  };

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  reloadComponent = () => {
    this.setState({});
  };

  render() {
    return (
      <Router>
        {this.getAccessToken() === "null" ? (
          ""
        ) : (
          <Navigation
            accessToken={this.getAccessToken()}
            reloadComponent={this.reloadComponent}
          />
        )}

        <Route
          path="/login"
          render={(props) => (
            <LoginForm
              {...props}
              setAccessToken={this.setAccessToken}
              reloadComponent={this.reloadComponent}
            />
            // <LoginForm {...props} getAccessToken={this.getAccessToken} />
          )}
        />
        <Route
          path="/"
          render={(props) => (
            <UserComponents {...props} accessToken={this.getAccessToken()} />
          )}
        />
      </Router>
    );
  }
}

export default App;
