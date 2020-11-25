import React, { Component } from "react";

import { NavLink } from "react-router-dom";

class CourierNew extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBase = this.handleChangeBase.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleChangeConfirmPassword2 = this.handleChangeConfirmPassword2.bind(
      this
    );
    this.handleChangeDistrict = this.handleChangeDistrict.bind(this);

    this.state = {
      courier: {
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
        district: "",
      },
      allDistrict: [],
      error: {
        confirmPasswordFirst: [],
        email: [],
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/district/", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((allDistrict) => {
        this.setState({
          allDistrict: allDistrict,
        });
      });
  }

  handleChangeBase(e) {
    const value = e.target.value;
    const name = e.target.name;
    let courier = this.state.courier;
    courier.user[name] = value;
    this.setState({
      courier,
    });
  }

  handleChangeConfirmPassword(e) {
    const value = e.target.value;
    let courier = this.state.courier;
    courier.user.confirmPassword.first = value;
    this.setState({
      courier,
    });
  }

  handleChangeConfirmPassword2(e) {
    const value = e.target.value;
    let courier = this.state.courier;
    courier.user.confirmPassword.second = value;
    this.setState({
      courier,
    });
  }

  handleChangeDistrict(e) {
    const value = e.target.value;
    const courier = this.state.courier;
    courier.district = value;
    this.setState({
      courier,
    });
  }

  handleSubmit(e) {
    // this.setState({
    //   courier: {
    //     user: {
    //       name: this.refs.name.value,
    //       surname: this.refs.surname.value,
    //       phoneNumber: this.refs.phoneNumber.value,
    //       email: this.refs.email.value,
    //     },
    //   },
    // });
    e.preventDefault();
    let json = JSON.stringify(this.state.courier);
    fetch("http://localhost:8000/api/courier/new", {
      method: "post",
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          this.props.history.push("/user/courier");
          return response;
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            this.handleErrorForm(res);
          });
        }
        throw new Error("Someting went wrong...");
      })
      .catch((error) => console.log(error));
  }

  handleErrorForm(res) {
    let error = this.state.error;
    if (
      res.form.children.user.children.confirmPassword.children.first.errors[0]
    ) {
      error.confirmPasswordFirst[0] =
        res.form.children.user.children.confirmPassword.children.first.errors[0];
    } else {
      error.confirmPasswordFirst = [];
    }
    this.setState({
      error,
    });
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="bg-secondary">
          <h1
            className="display-4 d-flex justify-content-center"
            style={{ paddingTop: 30 }}
          >
            Create new courier
          </h1>
          <div
            className="d-flex justify-content-center"
            style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}
          >
            <form onSubmit={this.handleSubmit}>
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
                      // ref="name"
                      onChange={this.handleChangeBase}
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
                      // ref="surname"
                      onChange={this.handleChangeBase}
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
                      onChange={this.handleChangeConfirmPassword}
                    />
                  </div>
                </div>
              </div>
              {this.state.error.confirmPasswordFirst.length === 0 ? (
                ""
              ) : (
                <span style={{ color: "red" }}>
                  {this.state.error.confirmPasswordFirst[0]}
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
                      onChange={this.handleChangeConfirmPassword2}
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
                      // ref="phoneNumber"
                      onChange={this.handleChangeBase}
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
                      // ref="email"
                      onChange={this.handleChangeBase}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="float-right">
                    <label htmlFor="email">District:</label>
                  </div>
                </div>
                <div className="col">
                  <div className="float-left">
                    <select
                      name="district"
                      value={this.state.courier.district}
                      onChange={this.handleChangeDistrict}
                    >
                      {this.state.allDistrict.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center" style={{ marginTop: 20 }}>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/user/courier" style={{ textAlign: "center" }}>
              back to list
            </NavLink>
            <NavLink to="/login" style={{ textAlign: "center" }}>
              logout
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default CourierNew;
