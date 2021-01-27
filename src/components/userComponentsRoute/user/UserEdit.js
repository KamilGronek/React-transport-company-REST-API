import React, { useEffect, useReducer } from "react";
import ModulAPI from "../../../api/ModulAPI";
import UserEditForm from "./UserEditForm";
import { initialUserState } from "../../../../src/InitialState";
const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function UserEdit(props) {
  const [state, setState] = useReducer(stateReducer, initialUserState);

  useEffect(() => {
    ModulAPI.getId(props.accessToken, "user", "get", props.location.id)
      .then((res) => {
        setState({
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
  }, []);

  const handleChangeBase = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let user = state.user;
    user[name] = value;
    setState({
      // [name]: value,
      user,
    });
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
    ModulAPI.put(
      props.accessToken,
      "user",
      "put",
      props.location.id,
      json,
      "/edit"
    ).then((response) => {
      props.history.push({
        pathname: "/user",
        state: { userEdit: props.location.id },
        activeEdit: true,
      });
      return response;
    });
  };

  const handleErrorForm = (res) => {
    let error = state.error;
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

    setState({
      error,
    });
  };

  console.log(state.error.email);
  return (
    <UserEditForm
      {...props}
      accessToken={props.accessToken}
      handleSubmit={handleSubmit}
      handleChangeBase={handleChangeBase}
      handleChangeConfirmPassword={handleChangeConfirmPassword}
      handleChangeConfirmPassword2={handleChangeConfirmPassword2}
      name={state.user.name}
      surname={state.user.surname}
      confirmPassword={state.user.confirmPassword.first}
      confirmPassword2={state.user.confirmPassword.second}
      phoneNumber={state.user.phoneNumber}
      email={state.user.email}
      id={props.location.id}
      error={state.error}
    />
  );
}

export default UserEdit;
