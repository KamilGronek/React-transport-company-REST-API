import React, { Component } from "react";
import ModulAPI from "../../../api/ModulAPI";
import { NavLink } from "react-router-dom";
import CourierNewForm from "./CourierNewForm";

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
    ModulAPI.get(this.props.accessToken, "district", "get").then(
      (allDistrict) => {
        this.setState({
          allDistrict: allDistrict,
        });
      }
    );
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
    ModulAPI.post(this.props.accessToken, "courier/new", "post", json).then(
      (courier) => {
        this.props.history.push({
          pathname: "/courier",
          state: { courierNewId: courier.user.id },
          active: true,
        });
      }
    );
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
      // z jakiegoś powodu nie działa

      // <CourierNewForm
      //   handleSubmit={this.handleSubmit}
      //   handleChangeBase={this.handleChangeBase}
      //   handleChangeConfirmPassword={this.handleChangeConfirmPassword}
      //   confirmPasswordFirstLength={
      //     this.state.error.confirmPasswordFirst.length
      //   }
      //   confirmPasswordFirst={this.state.error.confirmPasswordFirst[0]}
      //   handleChangeConfirmPassword2={this.handleChangeConfirmPassword2}
      //   allDistrict={this.state.allDistrict}
      //   // courierDistrict={this.state.courier.district}
      // />
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
      </>
    );
  }
}

export default CourierNew;
