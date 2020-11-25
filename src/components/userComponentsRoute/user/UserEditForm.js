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
      name,
      surname,
      confirmPassword,
      confirmPassword2,
      phoneNumber,
      email,
    } = this.props;
    // console.log(emailLength[0]);

    return (
      <div className="d-flex justify-content-center">
        <div className="bg-secondary">
          <h1
            className="display-4 d-flex justify-content-center"
            style={{ paddingTop: 30 }}
          >
            Edit User
          </h1>
          <div
            className="d-flex justify-content-center"
            style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}
          >
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="user">Name</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={this.props.handleChangeBase}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="surname">Surname</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={surname}
                      onChange={this.props.handleChangeBase}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <input
                      type="password"
                      id="password"
                      name="first"
                      value={confirmPassword}
                      onChange={this.props.handleChangeConfirmPassword}
                    />
                  </div>
                </div>
              </div>
              {this.props.error.confirmPasswordFirst.length === 0 ? (
                ""
              ) : (
                <span style={{ color: "red" }}>
                  {this.props.error.confirmPasswordFirst[0]}
                </span>
              )}

              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="password">Confirm Password</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <input
                      type="password"
                      id="password"
                      name="second"
                      value={confirmPassword2}
                      onChange={this.props.handleChangeConfirmPassword2}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="phoneNumber">Phone Number</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={this.props.handleChangeBase}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="email">E-mail</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.props.handleChangeBase}
                    />
                  </div>
                </div>
              </div>

              {this.props.error.email.length === 0 ? (
                ""
              ) : (
                <span style={{ color: "red" }}>
                  {this.props.error.email[0]}
                </span>
              )}

              <div className="text-center" style={{ marginTop: 20 }}>
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
              </div>
              <div className="d-flex flex-column">
                <NavLink to="/user" style={{ textAlign: "center" }}>
                  back to list
                </NavLink>

                <UserDelete
                  {...this.props}
                  accessToken={this.props.accessToken}
                  id={this.props.id}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserEditForm;
