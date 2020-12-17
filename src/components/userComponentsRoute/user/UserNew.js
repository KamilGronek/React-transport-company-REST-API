import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

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

  handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(this.state.user);
    fetch("http://localhost:8000/api/user/new", {
      method: "post",
      body: json,
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response;
        }
        if (response.status === 400) {
          return response.json().then((res) => {
            this.handleErrorForm(res);
          });
        }
        throw new Error("Something went wrong ...");
      })
      .then((response) => response.json())
      .then((user) => {
        console.log(this.props.history.location.active);
        console.log(this.state.active);
        this.props.history.push({
          pathname: "/user",
          state: { userId: user.id },
          active: true,
        });
      })
      .catch((error) => console.log(error));
  };

  handleErrorForm = (res) => {
    let error = this.state.error;
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

    this.setState({
      error,
    });
  };

  render() {
    return (
      <>
        <h1
          className="display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "100px" }}
        >
          Create new user
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
                  Confirm Password:
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
                  Phone Number:
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
                  E-mail:
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
                  {this.state.error.email.length === 0 ? (
                    ""
                  ) : (
                    <span style={{ color: "red" }}>
                      {this.state.error.email[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 20 }}>
            <button
              // onClick={this.PassActiveUserId}
              className="btn btn-success  btn-circle btn-lg"
              type="submit"
            >
              CREATE
            </button>
          </div>
          <div className="d-flex flex-column">
            <NavLink
              to={{
                pathname: "/user",
                state: { userId: 0 },
              }}
              style={{ textAlign: "center" }}
            >
              back to list
            </NavLink>
            <NavLink
              to={{
                pathname: "/login",
                state: { userId: 0 },
              }}
              style={{ textAlign: "center" }}
            >
              logout
            </NavLink>
          </div>
        </form>
      </>
      // <div className="d-flex justify-content-center">
      //   <div className="bg-secondary">
      //     <h1
      //       className="display-4 d-flex justify-content-center"
      //       style={{ paddingTop: 30 }}
      //     >
      //       Create new User
      //     </h1>
      //     <div
      //       className="d-flex justify-content-center"
      //       style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}
      //     >
      //       <form onSubmit={this.handleSubmit}>
      //         <div className="row">
      //           <div className="col">
      //             <div className="float-right">
      //               <label htmlFor="user">Name</label>
      //             </div>
      //           </div>
      //           <div className="col">
      //             <div className="float-left">
      //               <input
      //                 type="text"
      //                 id="name"
      //                 name="name"
      //                 onChange={this.handleChangeBase}
      //               />
      //             </div>
      //           </div>
      //         </div>

      //         <div className="row">
      //           <div className="col">
      //             <div className="float-right">
      //               <label htmlFor="surname">Surname</label>
      //             </div>
      //           </div>
      //           <div className="col">
      //             <div className="float-left">
      //               <input
      //                 type="text"
      //                 id="surname"
      //                 name="surname"
      //                 onChange={this.handleChangeBase}
      //               />
      //             </div>
      //           </div>
      //         </div>

      //         <div className="row">
      //           <div className="col">
      //             <div className="float-right">
      //               <label htmlFor="password">Password</label>
      //             </div>
      //           </div>
      //           <div className="col">
      //             <div className="float-left">
      //               <input
      //                 type="password"
      //                 id="password"
      //                 name="first"
      //                 onChange={this.handleChangeConfirmPassword}
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         {this.state.error.confirmPasswordFirst.length === 0 ? (
      //           ""
      //         ) : (
      //           <span style={{ color: "red" }}>
      //             {this.state.error.confirmPasswordFirst[0]}
      //           </span>
      //         )}
      //         <div className="row">
      //           <div className="col">
      //             <div className="float-right">
      //               <label htmlFor="password">Confirm Password</label>
      //             </div>
      //           </div>
      //           <div className="col">
      //             <div className="float-left">
      //               <input
      //                 type="password"
      //                 id="password"
      //                 name="second"
      //                 onChange={this.handleChangeConfirmPassword2}
      //               />
      //             </div>
      //           </div>
      //         </div>

      //         <div className="row">
      //           <div className="col">
      //             <div className="float-right">
      //               <label htmlFor="phoneNumber">Phone Number</label>
      //             </div>
      //           </div>
      //           <div className="col">
      //             <div className="float-left">
      //               <input
      //                 type="text"
      //                 id="phoneNumber"
      //                 name="phoneNumber"
      //                 onChange={this.handleChangeBase}
      //               />
      //             </div>
      //           </div>
      //         </div>

      //         <div className="row">
      //           <div className="col">
      //             <div className="float-right">
      //               <label htmlFor="email">E-mail</label>
      //             </div>
      //           </div>
      //           <div className="col">
      //             <div className="float-left">
      //               <input
      //                 type="email"
      //                 id="email"
      //                 name="email"
      //                 onChange={this.handleChangeBase}
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         {this.state.error.email.length === 0 ? (
      //           ""
      //         ) : (
      //           <span style={{ color: "red" }}>
      //             {this.state.error.email[0]}
      //           </span>
      //         )}
      //         <div className="text-center" style={{ marginTop: 20 }}>
      //           <button className="btn btn-primary" type="submit">
      //             Save
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //     <div className="d-flex flex-column">
      //       <NavLink to="/user" style={{ textAlign: "center" }}>
      //         back to list
      //       </NavLink>
      //       <NavLink to="/login" style={{ textAlign: "center" }}>
      //         logout
      //       </NavLink>
      //     </div>
      //   </div>
      // </div>
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
