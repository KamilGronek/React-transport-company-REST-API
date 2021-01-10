import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import UserDelete from "./UserDelete";

class UserEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      handleSubmit,
      handleChangeBase,
      handleChangeConfirmPassword,
      handleChangeConfirmPassword2,
      name,
      surname,
      confirmPassword,
      confirmPassword2,
      phoneNumber,
      email,
      accessToken,
      id,
    } = this.props;

    return (
      <>
        <h1
          className="display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "130px" }}
        >
          User edit
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center ">
            <div
              className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light "
              style={{ borderRadius: "10px" }}
            >
              <br />
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Name:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChangeBase}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="surname"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Surname:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="surname"
                    name="surname"
                    value={surname}
                    onChange={handleChangeBase}
                    placeholder="Surname"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="password"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Password:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="first"
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    placeholder="Password"
                  />
                  {this.props.error.confirmPasswordFirst.length === 0 ? (
                    ""
                  ) : (
                    <span className="red">
                      {this.props.error.confirmPasswordFirst[0]}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="password"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Confirm Password
                </label>

                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="second"
                    value={confirmPassword2}
                    onChange={handleChangeConfirmPassword2}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="phoneNumber"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Phone Number
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChangeBase}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="email"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  E-mail
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChangeBase}
                    placeholder=" E-mail"
                  />
                  {this.props.error.email.length === 0 ? (
                    ""
                  ) : (
                    <span style={{ color: "red" }}>
                      {this.props.error.email[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 20 }}>
            <button
              className="btn btn-warning  btn-circle btn-lg"
              type="submit"
            >
              EDIT
            </button>
          </div>
          <div className="d-flex flex-column d-flex justify-content-center">
            <NavLink to="/user" style={{ textAlign: "center" }}>
              back to list
            </NavLink>

            <UserDelete {...this.props} accessToken={accessToken} id={id} />
          </div>
        </form>
      </>
    );
  }
}

export default UserEditForm;
