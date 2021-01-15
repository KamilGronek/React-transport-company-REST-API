import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import ModulAPI from "../../../api/ModulAPI";
import UserNewForm from "./UserNewForm";
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
      active: this.props.location.active,
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
    // const name = e.target.name;
    const value = e.target.value;
    let user = this.state.user;
    user["confirmPassword"]["first"] = value;
    user["confirmPassword"]["second"] = this.state.user.confirmPassword.second;
    console.log(this.state);
    this.setState({
      user,
    });
  };

  handleChangeConfirmPassword2 = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    let user = this.state.user;
    user["confirmPassword"]["first"] = this.state.user.confirmPassword.first;
    user["confirmPassword"]["second"] = value;
    this.setState({
      user,
    });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let json = JSON.stringify(this.state.user);
  //   fetch("http://localhost:8000/api/user/new", {
  //     method: "post",
  //     body: json,
  //     headers: new Headers({
  //       Authorization: "Bearer " + this.props.accessToken,
  //       "Content-Type": "application/json",
  //     }),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.status === 201) {
  //         return response;
  //       }
  //       if (response.status === 400) {
  //         return response.json().then((res) => {
  //           this.handleErrorForm(res);
  //         });
  //       }
  //       throw new Error("Something went wrong ...");
  //     })
  //     .then((response) => response.json())
  //     .then((user) => {
  //       console.log(this.props.history.location.active);
  //       console.log(this.state.active);
  //       this.props.history.push({
  //         pathname: "/user",
  //         state: { userId: user.id },
  //         active: true,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(this.state.user);
    ModulAPI.post(this.props.accessToken, "user/new", "post", json).then(
      (user) => {
        this.props.history.push({
          pathname: "/user",
          state: { userId: user.id },
          active: true,
        });
      }
    );
  };

  handleErrorForm = (res) => {
    let error = this.state.error;
    // console.log(res.form.children.confirmPassword.children.first);
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

// .then((response) => response.json())
// .then((res) => {
//   this.setState({
//     error: {
//       email: [res.form.children.email.errors[0]],
//     },
//   });
// })
// .then((res) => {
//   this.setState({
//     confirmPasswordFirst: [
//       res.form.children.confirmPassword.children.first.errors[0],
//     ],
//   });
// })
