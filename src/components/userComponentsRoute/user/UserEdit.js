import React, { Component } from "react";
import ModulAPI from "../../../api/ModulAPI";
import UserEditForm from "./UserEditForm";

class UserEdit extends Component {
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
    };
  }

  componentDidMount() {
    ModulAPI.getId(
      this.props.accessToken,
      "user",
      "get",
      this.props.location.id
    )
      .then((res) => {
        this.setState({
          user: {
            name: res.name,
            surname: res.surname,
            confirmPassword: {
              first: res.password,
              second: res.password,
            },
            phoneNumber: res.phone_number,
            email: res.email_canonical,
          },
        });
      })
      .catch((error) => console.log(error));
  }

  handleChangeBase = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let user = this.state.user;
    user[name] = value;
    this.setState({
      // [name]: value,
      user,
    });
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
    ModulAPI.put(
      this.props.accessToken,
      "user",
      "put",
      this.props.location.id,
      json,
      "/edit"
    ).then((response) => {
      this.props.history.push({
        pathname: "/user",
        state: { userEdit: this.props.location.id },
        activeEdit: true,
      });
      return response;
    });
  };

  handleErrorForm = (res) => {
    let error = this.state.error;
    console.log(res.form.children.confirmPassword.children.first);
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
    console.log(this.state.error.email);
    return (
      <UserEditForm
        {...this.props}
        accessToken={this.props.accessToken}
        handleSubmit={this.handleSubmit}
        handleChangeBase={this.handleChangeBase}
        handleChangeConfirmPassword={this.handleChangeConfirmPassword}
        handleChangeConfirmPassword2={this.handleChangeConfirmPassword2}
        name={this.state.user.name}
        surname={this.state.user.surname}
        confirmPassword={this.state.user.confirmPassword.first}
        confirmPassword2={this.state.user.confirmPassword.second}
        phoneNumber={this.state.user.phoneNumber}
        email={this.state.user.email}
        id={this.props.location.id}
        error={this.state.error}
      />
    );
  }
}

export default UserEdit;
