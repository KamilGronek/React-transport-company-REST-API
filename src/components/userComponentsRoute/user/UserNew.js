// import React, { Component } from "react";
import React, { useReducer } from "react";
// import { Redirect } from "react-router-dom";
import ModulAPI from "../../../api/ModulAPI";
import UserNewForm from "./UserNewForm";
// import { NavLink } from "react-router-dom";
import { initialUserState } from "../../../../src/InitialState";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function UserNew(props) {
  const [state, setState] = useReducer(stateReducer, initialUserState);

  const handleChangeBase = (e) => {
    // console.log(state);
    const value = e.target.value;
    const name = e.target.name;
    let user = state.user;
    user[name] = value;
    setState({
      user,
    });
    // console.log(this.state);
  };

  const handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    let user = state.user;
    user.confirmPassword.first = value;
    setState({
      user,
    });
  };

  const handleChangeConfirmPassword2 = (e) => {
    const value = e.target.value;
    let user = state.user;
    user.confirmPassword.second = value;
    setState({
      user,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(state.user);
    ModulAPI.post(props.accessToken, "user/new", "post", json)
      .then((user) => {
        props.history.push({
          pathname: "/user",
          state: { userId: user.id },
          active: true,
        });
      })
      .catch((err) => {
        if (err.text) {
          err.text().then((err) => {
            console.log(err);
            handleErrorForm(err);
          });
        }
      });
  };

  const handleErrorForm = (res) => {
    let error = state.error;
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
    setState({
      error,
    });
  };

  return (
    <UserNewForm
      handleSubmit={handleSubmit}
      handleChangeBase={handleChangeBase}
      handleChangeConfirmPassword={handleChangeConfirmPassword}
      confirmPasswordFirstLength={state.error.confirmPasswordFirst.length}
      confirmPasswordFirst={state.error.confirmPasswordFirst[0]}
      handleChangeConfirmPassword2={handleChangeConfirmPassword2}
      errorLength={state.error.email.length}
      errorEmail={state.error.email[0]}
    />
  );
}

export default UserNew;
