import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

class UserOrderNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userOrder: {
        number: "",
        description: "",
        comments: "",
        headquarters: "",
        package: {
          weight: "",
          width: "",
          height: "",
          length: "",
        },
        senderDetails: {
          name: "",
          surname: "",
          city: "",
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          email: "",
          district: "",
          phoneNumber: "",
        },
        recipientDetails: {
          name: "",
          surname: "",
          city: "",
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          email: "",
          district: "",
          phoneNumber: "",
        },
      },
      allHeadquarters: [],
      allDistrict: [],
      changeArrow: true,
      hrLine: true,
      active: this.props.location.active,
    };
  }

  handleSwitchArrow = () => {
    this.setState({
      changeArrow: !this.state.changeArrow,
      hrLine: !this.state.hrLine,
    });
  };

  handleChangeBase = (e) => {
    console.log(this.state);
    const value = e.target.value;
    const name = e.target.name;
    let userOrder = this.state.userOrder;
    userOrder[name] = value;
    this.setState({
      userOrder,
    });
    console.log(this.state);
  };

  handleChangePackage = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let packageValue = this.state.userOrder.package;
    packageValue[name] = value;
    this.setState({
      packageValue,
    });
  };

  handleChangeSenderDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let senderDetails = this.state.userOrder.senderDetails;
    senderDetails[name] = value;
    this.setState({
      senderDetails,
    });
  };

  handleChangeRecipientDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let recipientDetails = this.state.userOrder.recipientDetails;
    recipientDetails[name] = value;
    this.setState({
      recipientDetails,
    });
  };
  //---------------------------------------------------------

  handleChangeHeadquarters = (e) => {
    let userOrder = this.state.userOrder;
    userOrder.headquarters = e.target.value;
    this.setState({
      userOrder,
    });
  };

  handleSelectSenderDistrict = (e) => {
    const value = e.target.value;
    let userOrder = this.state.userOrder;
    userOrder.senderDetails.district = value;
    this.setState({
      userOrder,
    });
  };
  handleSelectRecipientDistrict = (e) => {
    let userOrder = this.state.userOrder;
    userOrder.recipientDetails.district = e.target.value;
    this.setState({
      userOrder,
    });
  };

  fetchHeadquarters() {
    fetch("http://localhost:8000/api/headquarters/", {
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
      .then((allHeadquarters) => {
        this.setState({
          allHeadquarters: allHeadquarters,
        });
      })
      .catch((error) => console.log(error));
  }

  fetchDistricts() {
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
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchHeadquarters();
    this.fetchDistricts();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(this.state.userOrder);
    fetch("http://localhost:8000/api/user-order/new", {
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
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .then((response) => response.json())
      .then((userOrder) => {
        this.props.history.push({
          pathname: "/user-order",
          state: { userOrderId: userOrder.id },
          active: true,
        });
      })

      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <h1
          className="m-3 display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "100px" }}
        >
          Create user order
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center ">
            <div className=" col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
              <br />
              <strong>Details:</strong>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Number:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="number"
                    name="number"
                    onChange={this.handleChangeBase}
                    placeholder="Number"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Description:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    onChange={this.handleChangeBase}
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Headquarters:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <select
                    className="form-control"
                    name="headquarters"
                    onChange={this.handleChangeHeadquarters}
                  >
                    {this.state.allHeadquarters.map((headquarter) => (
                      <option key={headquarter.id} value={headquarter.id}>
                        {headquarter.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Comments:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="text"
                    id="comments"
                    name="comments"
                    onChange={this.handleChangeBase}
                    placeholder="Comments"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
              <br />
              <strong>Package:</strong>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Weight:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="number"
                    id="weight"
                    name="weight"
                    onChange={this.handleChangePackage}
                    placeholder="Weight"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Height:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="number"
                    id="height"
                    name="height"
                    onChange={this.handleChangePackage}
                    placeholder="Height"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Length:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="number"
                    id="length"
                    name="length"
                    onChange={this.handleChangePackage}
                    placeholder="Length"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Width:
                </label>
                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <input
                    className="form-control"
                    type="number"
                    id="width"
                    name="width"
                    onChange={this.handleChangePackage}
                    placeholder="Width"
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.hrLine && (
            <div className="col-2 offset-5">
              <div className="col-4 offset-4">
                <hr className="hr" />
              </div>
            </div>
          )}
          <div id="accordion">
            <div>
              <div
                style={{ paddingBottom: "10px" }}
                className=" row justify-content-center col-6 offset-3"
                id="headingThree "
              >
                <h5 className="mb-0 ">
                  <Link
                    to="continuedOrder"
                    smooth={true}
                    duration={1000}
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    onClick={this.handleSwitchArrow}
                    style={{ fontSize: "11px" }}
                  >
                    continued order
                  </Link>

                  <Link
                    to="continuedOrder"
                    smooth={true}
                    duration={1000}
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    className={
                      "arrow " + (this.state.changeArrow ? "down" : "up")
                    }
                    onClick={this.handleSwitchArrow}
                  >
                    {" "}
                  </Link>
                </h5>
              </div>

              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                <div className="row justify-content-center" id="continuedOrder">
                  <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
                    <br />
                    <strong>Sender details:</strong>
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
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
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
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Surname"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        City:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="city"
                          name="city"
                          onChange={this.handleChangeSenderDetails}
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Street:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="street"
                          name="street"
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        House number:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="houseNumber"
                          name="houseNumber"
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Apartment number:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="apartmentNumber"
                          name="apartmentNumber"
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Phone number:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        E-mail:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          onChange={this.handleChangeSenderDetails}
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        District:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <select
                          className="form-control"
                          name="senderDetailsDistrict"
                          onChange={this.handleSelectSenderDistrict}
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
                  <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
                    <br />
                    <strong>Recipient details:</strong>
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
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
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
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="Surname"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        City:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="city"
                          name="city"
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Street:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="street"
                          name="street"
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        House number:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="houseNumber"
                          name="houseNumber"
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="House number"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Apartment number:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="apartmentNumber"
                          name="apartmentNumber"
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="Apartment number"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Phone number:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        E-mail:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          onChange={this.handleChangeRecipientDetails}
                          placeholder="E-mail"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        District:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <select
                          className="form-control"
                          name="recipientDetailsDistrict"
                          onChange={this.handleSelectRecipientDistrict}
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
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-success btn-circle btn-lg" type="submit">
              CREATE
            </button>
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/user-order" style={{ textAlign: "center" }}>
              back to list
            </NavLink>
            <NavLink to="" style={{ textAlign: "center" }}>
              logout
            </NavLink>
          </div>
          <br />
        </form>
        {/* <div className="row justify-content-center ">
            <div
              className="col-xl-3 col-lg-3 col-md-5 col-8 "
              style={{ backgroundColor: "red" }}
            >
              <br />
              <strong>Details:</strong>

              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="number"
                    name="number"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Description:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Headquarters:</label>
                </div>
                <select
                  className="form-control"
                  style={{ width: "200px" }}
                  name="headquarters"
                  onChange={this.handleChangeHeadquarters}
                >
                  {this.state.allHeadquarters.map((headquarter) => (
                    <option key={headquarter.id} value={headquarter.id}>
                      {headquarter.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Comments:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="comments"
                    name="comments"
                    onChange={this.handleChangeBase}
                  />
                </div>
              </div>
              <br />
            </div>

            <div class="col-xl-3  col-lg-3 col-md-5 col-8  bg-light  bg-light border-top border-right">
              <br />
              <strong>Package:</strong>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Weight:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="number"
                    id="weight"
                    name="weight"
                    onChange={this.handleChangePackage}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Height:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="number"
                    id="height"
                    name="height"
                    onChange={this.handleChangePackage}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Length:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="number"
                    id="length"
                    name="length"
                    onChange={this.handleChangePackage}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Width:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="number"
                    id="width"
                    name="width"
                    onChange={this.handleChangePackage}
                  />
                </div>
              </div>
            </div>
          </div> */}
        {/* <div class="row justify-content-center">
            <div class="col-xl-3  col-lg-3 col-md-5 col-8 bg-light  bg-light border-bottom border-left">
              <strong>Sender details:</strong>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Name:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Surname:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">City:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    name="city"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="street">Street:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="street"
                    name="street"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">House number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Apartment number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="apartmentNumber"
                    name="apartmentNumber"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">Phone number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">E-mail:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    name="email"
                    onChange={this.handleChangeSenderDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="user">District:</label>
                </div>
                <select
                  className="form-control"
                  style={{ width: "200px" }}
                  name="senderDetailsDistrict"
                  onChange={this.handleSelectSender}
                >
                  {this.state.allDistrict.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="col-xl-3  col-lg-3 col-md-5 col-8 bg-light border-bottom border-right">
              <strong>Recipient details:</strong>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="name">Name:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="surname">Surname:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="city">City:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="city"
                    name="city"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="street">Street:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="street"
                    name="street"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="houseNumber">House number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="apartmentNumber">Apartment number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="apartmentNumber"
                    name="apartmentNumber"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="phoneNumber">Phone number:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="email">E-mail:</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    name="email"
                    onChange={this.handleChangeRecipientDetails}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor="district">District:</label>
                </div>
                <select
                  className="form-control"
                  style={{ width: "200px" }}
                  name="recipientDetailsDistrict"
                  onChange={this.handleSelectRecipient}
                >
                  {this.state.allDistrict.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
            </div>
          </div> */}
      </>
    );
  }
}

export default UserOrderNew;
