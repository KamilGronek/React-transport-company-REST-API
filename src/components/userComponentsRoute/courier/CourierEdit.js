import React, { useEffect, useReducer } from "react";
import ModulAPI from "../../../api/ModulAPI";
import CourierEditForm from "./CourierEditForm";
import { initialCourierEditState } from "../../../../src/InitialState";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function CourierEdit(props) {
  const [state, setState] = useReducer(stateReducer, initialCourierEditState);

  useEffect(() => {
    ModulAPI.getId(props.accessToken, "courier", "get", props.location.id).then(
      (res) => {
        setState({
          // bo to musimy od razu odczytać w inputach
          courier: {
            // id: res.id,
            user: {
              // id: res.user.id,
              name: res.user.name,
              surname: res.user.surname,
              confirmPassword: {
                first: res.user.password,
                second: res.user.password,
              },
              phoneNumber: res.user.phone_number,
              email: res.user.email_canonical,
            },
            district: res.district.id,
          },
        });
      }
    );
  }, []);

  const handleChangeBase = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let courier = state.courier;
    courier.user[name] = value;
    setState({
      courier,
    });
  };

  const handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    let courier = state.courier;
    courier.user.confirmPassword.first = value;
    setState({
      courier,
    });
  };

  const handleChangeConfirmPassword2 = (e) => {
    const value = e.target.value;
    let courier = state.courier;
    courier.user.confirmPassword.second = value;
    setState({
      courier,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(state.courier);
    fetch("http://localhost:8000/api/courier/" + props.location.id + "/edit", {
      method: "put",
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          props.history.push({
            pathname: "/courier",
            // state: { courierEdit: this.state.courier.user.id },
            activeEdit: true,
          });
          return response;
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            handleErrorForm(res);
          });
        }
        throw new Error("Something went wrong...");
      })

      .catch((error) => console.log(error));
  };

  const handleErrorForm = (res) => {
    let error = state.error;
    if (
      res.form.children.user.children.confirmPassword.children.first.errors[0]
    ) {
      error.confirmPasswordFirst[0] =
        res.form.children.user.children.confirmPassword.children.first.errors[0];
    } else {
      error.confirmPasswordFirst = [];
    }
    setState({
      error,
    });
  };

  return (
    <CourierEditForm
      handleSubmit={handleSubmit}
      handleChangeBase={handleChangeBase}
      handleChangeConfirmPassword={handleChangeConfirmPassword}
      confirmPasswordFirstLength={state.error.confirmPasswordFirst.length}
      confirmPasswordFirst={state.error.confirmPasswordFirst[0]}
      handleChangeConfirmPassword2={handleChangeConfirmPassword2}
      allDistrict={state.allDistrict}
      courierDistrict={state.courier.district}
      name={state.courier.user.name}
      surname={state.courier.user.surname}
      email={state.courier.user.email}
      confirmPasswordFirstValue={state.courier.user.confirmPassword.first}
      confirmPasswordSecondValue={state.courier.user.confirmPassword.second}
      phoneNumber={state.courier.user.phoneNumber}
      {...props}
      accessToken={props.accessToken}
      id={props.location.id}
    />
  );
}
export default CourierEdit;
