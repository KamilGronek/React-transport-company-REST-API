import React, { Component } from "react";
import ModulAPI from "../../../api/ModulAPI";
import CourierEditForm from "./CourierEditForm";

class CourierEdit extends Component {
  constructor(props) {
    super(props);

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
    ModulAPI.getId(
      this.props.accessToken,
      "courier",
      "get",
      this.props.location.id
    ).then((res) => {
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

  handleSubmit = (e) => {
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
  };

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
    return (
      <CourierEditForm
        handleSubmit={this.handleSubmit}
        handleChangeBase={this.handleChangeBase}
        handleChangeConfirmPassword={this.handleChangeConfirmPassword}
        confirmPasswordFirstLength={
          this.state.error.confirmPasswordFirst.length
        }
        confirmPasswordFirst={this.state.error.confirmPasswordFirst[0]}
        handleChangeConfirmPassword2={this.handleChangeConfirmPassword2}
        allDistrict={this.state.allDistrict}
        courierDistrict={this.state.courier.district}
        name={this.state.courier.user.name}
        surname={this.state.courier.user.surname}
        email={this.state.courier.user.email}
        confirmPasswordFirstValue={
          this.state.courier.user.confirmPassword.first
        }
        confirmPasswordSecondValue={
          this.state.courier.user.confirmPassword.second
        }
        phoneNumber={this.state.courier.user.phoneNumber}
        {...this.props}
        accessToken={this.props.accessToken}
        id={this.props.location.id}
      />
      // <>
      //   <h1
      //     className="display-4 d-flex justify-content-center"
      //     style={{ fontSize: "40px", paddingTop: "100px" }}
      //   >
      //     Courier edit
      //   </h1>
      //   <form onSubmit={this.handleSubmit}>
      //     <div className="row justify-content-center ">
      //       <div
      //         className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light "
      //         style={{ borderRadius: "10px" }}
      //       >
      //         <br />
      //         <div className="form-group row">
      //           <label
      //             htmlFor="name"
      //             class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
      //           >
      //             Name:
      //           </label>
      //           <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
      //             <input
      //               class="form-control"
      //               type="text"
      //               id="name"
      //               name="name"
      //               value={this.state.courier.user.name}
      //               onChange={this.handleChangeBase}
      //               placeholder="Name"
      //             />
      //           </div>
      //         </div>
      //         <div class="form-group row">
      //           <label
      //             htmlFor="surname"
      //             class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
      //           >
      //             Surname:
      //           </label>
      //           <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
      //             <input
      //               className="form-control"
      //               type="text"
      //               id="surname"
      //               name="surname"
      //               value={this.state.courier.user.surname}
      //               onChange={this.handleChangeBase}
      //               placeholder="Surname"
      //             />
      //           </div>
      //         </div>
      //         <div class="form-group row">
      //           <label
      //             htmlFor="password"
      //             class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
      //           >
      //             Password:
      //           </label>
      //           <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
      //             <input
      //               className="form-control"
      //               type="password"
      //               id="password"
      //               name="first"
      //               value={this.state.courier.user.confirmPassword.first}
      //               onChange={this.handleChangeConfirmPassword}
      //               placeholder="Password"
      //             />
      //             {this.state.error.confirmPasswordFirst.length === 0 ? (
      //               ""
      //             ) : (
      //               <span style={{ color: "red" }}>
      //                 {this.state.error.confirmPasswordFirst[0]}
      //               </span>
      //             )}
      //           </div>
      //         </div>
      //         <div class="form-group row">
      //           <label
      //             htmlFor="password"
      //             class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
      //           >
      //             Confirm Password
      //           </label>

      //           <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
      //             <input
      //               className="form-control"
      //               type="password"
      //               id="password"
      //               name="second"
      //               value={this.state.courier.user.confirmPassword.second}
      //               onChange={this.handleChangeConfirmPassword2}
      //               placeholder="Confirm Password"
      //             />
      //           </div>
      //         </div>
      //         <div class="form-group row">
      //           <label
      //             htmlFor="phoneNumber"
      //             class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
      //           >
      //             Phone Number
      //           </label>
      //           <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
      //             <input
      //               className="form-control"
      //               type="text"
      //               id="phoneNumber"
      //               name="phoneNumber"
      //               value={this.state.courier.user.phoneNumber}
      //               onChange={this.handleChangeBase}
      //               placeholder="Phone Number"
      //             />
      //           </div>
      //         </div>
      //         <div class="form-group row">
      //           <label
      //             htmlFor="email"
      //             class=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
      //           >
      //             E-mail
      //           </label>
      //           <div class="col-xl-7 col-lg-8 col-sm-9 col-12">
      //             <input
      //               className="form-control"
      //               type="email"
      //               id="email"
      //               name="email"
      //               value={this.state.courier.user.email}
      //               onChange={this.handleChangeBase}
      //               placeholder=" E-mail"
      //             />
      //             {/* {this.props.error.email.length === 0 ? (
      //               ""
      //             ) : (
      //               <span style={{ color: "red" }}>
      //                 {this.props.error.email[0]}
      //               </span>
      //             )} */}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="text-center" style={{ marginTop: 20 }}>
      //       <button
      //         className="btn btn-warning  btn-circle btn-lg"
      //         type="submit"
      //       >
      //         EDIT
      //       </button>
      //     </div>
      //     <div className="d-flex flex-column">
      //       <NavLink to="/courier" style={{ textAlign: "center" }}>
      //         back to list
      //       </NavLink>

      //       <CourierDelete
      //         {...this.props}
      //         accessToken={this.props.accessToken}
      //         id={this.props.id}
      //       />
      //     </div>
      //   </form>
      // </>
    );
  }
}
export default CourierEdit;
