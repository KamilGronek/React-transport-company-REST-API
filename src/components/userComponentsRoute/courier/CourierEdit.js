import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CourierDelete from "./CourierDelete";
class CourierEdit extends Component {
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

    this.state = {
      courier: {
        // id:""
        user: {
          // id:""
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
      error: {
        confirmPasswordFirst: [],
        email: [],
      },
    };
  }

  componentDidMount() {
    console.log(this.props.location);
    fetch("http://localhost:8000/api/courier/" + this.props.location.id, {
      //read
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
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
      })
      .catch((error) => console.log(error));
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

  handleSubmit(e) {
    e.preventDefault();
    let json = JSON.stringify(this.state.courier);
    fetch(
      "http://localhost:8000/api/courier/" + this.props.location.id + "/edit",
      {
        method: "put",
        body: json,
        headers: new Headers({
          Authorization: "Bearer " + this.props.accessToken,
          "Content-Type": "application/json",
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/courier");
          return response;
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            this.handleErrorForm(res);
          });
        }
        throw new Error("Something went wrong...");
      })

      .catch((error) => console.log(error));
  }

  handleErrorForm = (res) => {
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
  };

  render() {
    console.log(this.props);
    // const { surname, phoneNumber, email } = this.state.courier.user;
    return (
      <>
        <h1
          className="display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "100px" }}
        >
          Courier edit
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
                  class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Name:
                </label>
                <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    class="form-control"
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.courier.user.name}
                    onChange={this.handleChangeBase}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  htmlFor="surname"
                  class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Surname:
                </label>
                <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="surname"
                    name="surname"
                    value={this.state.courier.user.surname}
                    onChange={this.handleChangeBase}
                    placeholder="Surname"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  htmlFor="password"
                  class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Password:
                </label>
                <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="first"
                    value={this.state.courier.user.confirmPassword.first}
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
              <div class="form-group row">
                <label
                  htmlFor="password"
                  class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Confirm Password
                </label>

                <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="second"
                    value={this.state.courier.user.confirmPassword.second}
                    onChange={this.handleChangeConfirmPassword2}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  htmlFor="phoneNumber"
                  class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Phone Number
                </label>
                <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={this.state.courier.user.phoneNumber}
                    onChange={this.handleChangeBase}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  htmlFor="email"
                  class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  E-mail
                </label>
                <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.courier.user.email}
                    onChange={this.handleChangeBase}
                    placeholder=" E-mail"
                  />
                  {/* {this.props.error.email.length === 0 ? (
                    ""
                  ) : (
                    <span style={{ color: "red" }}>
                      {this.props.error.email[0]}
                    </span>
                  )} */}
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
          <div className="d-flex flex-column">
            <NavLink to="/courier" style={{ textAlign: "center" }}>
              back to list
            </NavLink>

            <CourierDelete
              {...this.props}
              accessToken={this.props.accessToken}
              id={this.props.id}
            />
          </div>
        </form>

        {/* <div className="d-flex justify-content-center">
          <div className="bg-secondary">
            <h1
              className="display-4 d-flex justify-content-center"
              style={{ paddingTop: 30 }}
            >
              Courier Edit
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
                        value={this.state.courier.user.name}
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
                        onChange={this.handleChangeBase}
                        value={this.state.courier.user.surname}
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
                        value={this.state.courier.user.confirmPassword.first}
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
                        value={this.state.courier.user.confirmPassword.second}
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
                        onChange={this.handleChangeBase}
                        value={this.state.courier.user.phoneNumber}
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
                        onChange={this.handleChangeBase}
                        value={this.state.courier.user.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center" style={{ marginTop: 20 }}>
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
                </div>
                <div className="d-flex flex-column">
                  <NavLink to="/user/courier" style={{ textAlign: "center" }}>
                    back to list
                  </NavLink>

                  <CourierDelete
                    {...this.props}
                    accessToken={this.props.accessToken}
                    id={this.props.id}
                  />
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}
export default CourierEdit;
