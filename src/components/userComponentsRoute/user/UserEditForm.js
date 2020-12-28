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

    return (
      <>
        <h1
          className="display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "130px" }}
        >
          Edit User
        </h1>
        <form onSubmit={this.props.handleSubmit}>
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
                    onChange={this.props.handleChangeBase}
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
                    onChange={this.props.handleChangeBase}
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
                    onChange={this.props.handleChangeConfirmPassword}
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
                    onChange={this.props.handleChangeConfirmPassword2}
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
                    onChange={this.props.handleChangeBase}
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
                    onChange={this.props.handleChangeBase}
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

            <UserDelete
              {...this.props}
              accessToken={this.props.accessToken}
              id={this.props.id}
            />
          </div>
        </form>
      </>
      // <div className="d-flex justify-content-center">
      //   <div className="bg-secondary">
      //     <h1
      //       className="display-4 d-flex justify-content-center"
      //       style={{ paddingTop: 30 }}
      //     >
      //       Edit User
      //     </h1>
      //     <div
      //       className="d-flex justify-content-center"
      //       style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}
      //     >
      //       <form onSubmit={this.props.handleSubmit}>
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
      //                 value={name}
      //                 onChange={this.props.handleChangeBase}
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
      //                 value={surname}
      //                 onChange={this.props.handleChangeBase}
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
      //                 value={confirmPassword}
      //                 onChange={this.props.handleChangeConfirmPassword}
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         {this.props.error.confirmPasswordFirst.length === 0 ? (
      //           ""
      //         ) : (
      //           <span style={{ color: "red" }}>
      //             {this.props.error.confirmPasswordFirst[0]}
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
      //                 value={confirmPassword2}
      //                 onChange={this.props.handleChangeConfirmPassword2}
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
      //                 value={phoneNumber}
      //                 onChange={this.props.handleChangeBase}
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
      //                 value={email}
      //                 onChange={this.props.handleChangeBase}
      //               />
      //             </div>
      //           </div>
      //         </div>

      //         {this.props.error.email.length === 0 ? (
      //           ""
      //         ) : (
      //           <span style={{ color: "red" }}>
      //             {this.props.error.email[0]}
      //           </span>
      //         )}

      //         <div className="text-center" style={{ marginTop: 20 }}>
      //           <button className="btn btn-primary" type="submit">
      //             Update
      //           </button>
      //         </div>
      //         <div className="d-flex flex-column">
      //           <NavLink to="/user" style={{ textAlign: "center" }}>
      //             back to list
      //           </NavLink>

      //           <UserDelete
      //             {...this.props}
      //             accessToken={this.props.accessToken}
      //             id={this.props.id}
      //           />
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default UserEditForm;
