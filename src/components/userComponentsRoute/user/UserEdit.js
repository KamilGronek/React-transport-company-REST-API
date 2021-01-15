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

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let json = JSON.stringify(this.state.user);
  //   fetch(
  //     "http://localhost:8000/api/user/" + this.props.location.id + "/edit",
  //     {
  //       method: "put",
  //       body: json,
  //       headers: new Headers({
  //         Authorization: "Bearer " + this.props.accessToken,
  //         "Content-Type": "application/json",
  //       }),
  //     }
  //   )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         this.props.history.push("/user");
  //         return response;
  //       }
  //       if (response.status === 400) {
  //         return response.json().then((res) => {
  //           this.handleErrorForm(res);
  //         });
  //       }
  //       throw new Error("Something went wrong...");
  //     })

  //     .catch((error) => console.log(error));
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(this.state.user);
    ModulAPI.putId(
      this.props.accessToken,
      "user",
      "put",
      this.props.location.id,
      json,
      this.props.history
    );
    // .then((res) => {
    //   this.handleErrorForm(res);
    // });
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
