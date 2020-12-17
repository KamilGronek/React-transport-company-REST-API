import React, { Component } from "react";

import { NavLink } from "react-router-dom";

class CourierNew extends Component {
  constructor(props) {
    super(props);

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
      active: this.props.location.active,
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

  handleChangeBase = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let courier = this.state.courier;
    courier.user[name] = value;
    this.setState({
      courier,
    });
  };

  handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    let courier = this.state.courier;
    courier.user.confirmPassword.first = value;
    this.setState({
      courier,
    });
  };

  handleChangeConfirmPassword2 = (e) => {
    const value = e.target.value;
    let courier = this.state.courier;
    courier.user.confirmPassword.second = value;
    this.setState({
      courier,
    });
  };

  handleChangeDistrict = (e) => {
    const value = e.target.value;
    const courier = this.state.courier;
    courier.district = value;
    this.setState({
      courier,
    });
  };

  handleSubmit = (e) => {
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
          return response;
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            this.handleErrorForm(res);
          });
        }
        throw new Error("Someting went wrong...");
      })
      .then((response) => response.json())
      .then((courier) => {
        this.props.history.push({
          pathname: "/courier",
          state: { courierNewId: courier.user.id },
          active: true,
        });
      })
      .catch((error) => console.log(error));
  };

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
      <>
        <h1
          className="display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "100px" }}
        >
          Create new courier
        </h1>
        <form onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChangeBase}
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
                    onChange={this.handleChangeBase}
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
                    onChange={this.handleChangeConfirmPassword}
                    placeholder="Password"
                  />
                  {this.state.error.confirmPasswordFirst.length === 0 ? (
                    ""
                  ) : (
                    <span style={{ color: "red" }}>
                      {this.state.error.confirmPasswordFirst[0]}
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
                    onChange={this.handleChangeConfirmPassword2}
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
                    onChange={this.handleChangeBase}
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
                    onChange={this.handleChangeBase}
                    placeholder=" E-mail"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="district"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  District:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <select
                    className="form-control"
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
          </div>
          <div className="text-center" style={{ marginTop: 20 }}>
            <button
              className="btn btn-success  btn-circle btn-lg"
              type="submit"
            >
              CREATE
            </button>
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/courier" style={{ textAlign: "center" }}>
              back to list
            </NavLink>
            <NavLink to="/login" style={{ textAlign: "center" }}>
              logout
            </NavLink>
          </div>
        </form>

        {/* <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center ">
            <div
              className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light "
              style={{ borderRadius: "10px" }}
            >
              <br />
              <div
                style={{ margin: "5px" }}
                className="d-flex justify-content-between"
              >
                <div>
                  <label className="label" htmlFor="user">
                    Name:
                  </label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <div
                style={{ margin: "5px" }}
                className="d-flex justify-content-between"
              >
                <div>
                  <label htmlFor="surname">Surname</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="first"
                    onChange={this.handleChangeConfirmPassword}
                  />
                </div>
                {this.state.error.confirmPasswordFirst.length === 0 ? (
                  ""
                ) : (
                  <span style={{ color: "red" }}>
                    {this.state.error.confirmPasswordFirst[0]}
                  </span>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="password">Confirm Password</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="second"
                    onChange={this.handleChangeConfirmPassword2}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="email">E-mail</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="email">District:</label>
                </div>
                <div>
                  <select
                    style={{ width: "200px" }}
                    className="form-control"
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
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 20 }}>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/user/courier" style={{ textAlign: "center" }}>
              back to list
            </NavLink>
            <NavLink to="/login" style={{ textAlign: "center" }}>
              logout
            </NavLink>
          </div>
        </form> */}
        {/* <div
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
          </div> */}
        {/* <div className="d-flex flex-column">
          <NavLink to="/user/courier" style={{ textAlign: "center" }}>
            back to list
          </NavLink>
          <NavLink to="/login" style={{ textAlign: "center" }}>
            logout
          </NavLink>
        </div> */}
      </>
    );
  }
}

export default CourierNew;
