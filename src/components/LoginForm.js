import React, { Component } from "react";
import "../styles/LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      accessToken: "",

      errors: {
        errorsEmail: false,
        errorsPassword: false,
      },
    };
  }

  componentDidMount() {
    this.setState({
      email: "",
      password: "",
      accessToken: "",
    });
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let json = JSON.stringify({
      grant_type: "password",
      client_id: "1_5w8zrdasdafr4tregd454cw0c0kswcgs0oks40s",
      username: this.state.email,
      password: this.state.password,
      client_secret: "sdgggskokererg4232404gc4csdgfdsgf8s8ck5s",
    });
    fetch("http://localhost:8000/oauth/v2/token", {
      method: "post",
      body: json,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((res) => {
        this.props.setAccessToken(res.access_token);
        this.props.history.push("/user");
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        <div className="container">
          <form
            style={{ borderRadius: "10px" }}
            className="m-5 border bg-light mx-auto col-xl-4 col-lg-4 col-sm-6  col-10 offset-xl-4 offset-lg-4 offset-sm-3 offset-1"
            onSubmit={this.handleSubmit}
          >
            <div className=" p-3 logo d-flex justify-content-center">
              <img src={"images/logo.png"} style={{ width: 200 }} alt="" />
            </div>

            <div className="form-group">
              <label className="label">
                <b>E-mail address:</b>
              </label>
              <input
                type="email"
                name="email"
                id="inputEmail"
                className="form-control"
                placeholder="E-mail address"
                required
                autoFocuss
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label className="label">
                <b>Password:</b>
              </label>
              <input
                type="password"
                name="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            {this.state.errors.errorsEmail && (
              <span style={{ color: "red" }}>
                {this.messages.email_incorrect}
              </span>
            )}
            <br></br>
            {this.state.errors.errorsPassword && (
              <span style={{ color: "red" }}>
                {this.messages.password_incorrect}
              </span>
            )}
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Sign in
              </button>
            </div>
            <br />
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
