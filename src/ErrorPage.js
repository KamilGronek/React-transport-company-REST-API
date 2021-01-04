import React, { Component } from "react";

class ErrorPage extends Component {
  textErrorPage() {
    if (this.props.accessToken) {
      return <h1>Page doesn't exist</h1>;
    }
  }

  render() {
    console.log(this.props.accessToken);
    return <>{this.textErrorPage()}</>;
  }
}

export default ErrorPage;
