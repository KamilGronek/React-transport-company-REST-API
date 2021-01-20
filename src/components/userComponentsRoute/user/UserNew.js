import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import ModulAPI from "../../../api/ModulAPI";
import UserNewForm from "./UserNewForm";
// import { NavLink } from "react-router-dom";

class UserNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        surname: "",
        confirmPassword: {
          first: "",
          second: "",
        },
        phoneNumber: "",
        email: "",
      },
      error: {
        confirmPasswordFirst: [],
        email: [],
      },
      // active: this.props.location.active,
    };
  }

  handleChangeBase = (e) => {
    console.log(this.state);
    const value = e.target.value;
    const name = e.target.name;
    let user = this.state.user;
    user[name] = value;
    this.setState({
      user,
    });
    console.log(this.state);
  };

  handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    let user = this.state.user;
    user.confirmPassword.first = value;
    this.setState({
      user,
    });
  };

  handleChangeConfirmPassword2 = (e) => {
    const value = e.target.value;
    let user = this.state.user;
    user.confirmPassword.second = value;
    this.setState({
      user,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(this.state.user);
    ModulAPI.post(this.props.accessToken, "user/new", "post", json)
      .then((user) => {
        this.props.history.push({
          pathname: "/user",
          state: { userId: user.id },
          active: true,
        });
      })
      .then(this.status)
      .then((res) => res.json())
      .catch((error) => {
        return Promise.resolve();
      });
  };

  status = (res) => {
    if (res.status === 400) {
      console.log("400");
      this.handleErrorForm(res);
    }
    return res;
  };

  handleErrorForm = (res) => {
    let error = this.state.error;
    if (
      res.form.children.confirmPassword.children.first.hasOwnProperty("errors")
    ) {
      error.confirmPasswordFirst[0] =
        res.form.children.confirmPassword.children.first.errors[0];
    } else {
      error.confirmPasswordFirst = [];
    }
    if (res.form.children.email.hasOwnProperty("errors")) {
      error.email[0] = res.form.children.email.errors[0];
    } else {
      error.email = [];
    }

    this.setState({
      error,
    });
  };
  render() {
    return (
      <UserNewForm
        handleSubmit={this.handleSubmit}
        handleChangeBase={this.handleChangeBase}
        handleChangeConfirmPassword={this.handleChangeConfirmPassword}
        confirmPasswordFirstLength={
          this.state.error.confirmPasswordFirst.length
        }
        confirmPasswordFirst={this.state.error.confirmPasswordFirst[0]}
        handleChangeConfirmPassword2={this.handleChangeConfirmPassword2}
        errorLength={this.state.error.email.length}
        errorEmail={this.state.error.email[0]}
      />
    );
  }
}

export default UserNew;
