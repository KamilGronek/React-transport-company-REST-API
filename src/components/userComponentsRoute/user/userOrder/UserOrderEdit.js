import React, { Component } from "react";
import UserOrderEditForm from "./UserOrderEditForm";
// import { NavLink } from "react-router-dom";
// import { Link } from "react-scroll";

class UserOrderEdit extends Component {
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
    let userOrder = this.state.userOrder;
    userOrder.senderDetails.district = e.target.value;
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

  fetchHeadquarters = () => {
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
  };

  fetchDistricts = () => {
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
  };

  getUserOrderEditValues = () => {
    fetch("http://localhost:8000/api/user-order/" + this.props.location.id, {
      //read
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
      .then((response) => {
        this.setState({
          userOrder: {
            number: response.number,
            description: response.description,
            comments: response.comments,
            headquarters: response.headquarters.id,
            package: {
              weight: response.package.weight,
              width: response.package.width,
              height: response.package.height,
              length: response.package.length,
            },
            senderDetails: {
              name: response.sender_details.name,
              surname: response.sender_details.surname,
              city: response.sender_details.city,
              street: response.sender_details.street,
              houseNumber: response.sender_details.house_number,
              apartmentNumber: response.sender_details.apartment_number,
              email: response.sender_details.email,
              district: response.sender_details.district.id,
              phoneNumber: response.sender_details.phone_number,
            },
            recipientDetails: {
              name: response.recipient_details.name,
              surname: response.recipient_details.surname,
              city: response.recipient_details.city,
              street: response.recipient_details.street,
              houseNumber: response.recipient_details.house_number,
              apartmentNumber: response.recipient_details.apartment_number,
              email: response.recipient_details.email,
              district: response.recipient_details.district.id,
              phoneNumber: response.recipient_details.phone_number,
            },
          },
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchHeadquarters();
    this.fetchDistricts();
    this.getUserOrderEditValues();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(this.state.userOrder);
    fetch(
      "http://localhost:8000/api/user-order/" +
        this.props.location.id +
        "/edit/user",
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
          this.props.history.push("/user-order");
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
          editColor: true,
        });
      })

      .catch((error) => console.log(error));
  };

  render() {
    const {
      headquarters,
      number,
      description,
      comments,
      senderDetails,
      recipientDetails,
    } = this.state.userOrder;

    return (
      <>
        <UserOrderEditForm
          handleSubmit={this.handleSubmit}
          handleChangeBase={this.handleChangeBase}
          handleChangeHeadquarters={this.handleChangeHeadquarters}
          allHeadquarters={this.state.allHeadquarters}
          headquarters={headquarters}
          handleChangePackage={this.handleChangePackage}
          handleChangeSenderDetails={this.handleChangeSenderDetails}
          handleSelectSenderDistrict={this.handleSelectSenderDistrict}
          handleChangeRecipientDetails={this.handleChangeRecipientDetails}
          handleSelectRecipientDistrict={this.handleSelectRecipientDistrict}
          number={number}
          description={description}
          comments={comments}
          senderDetails={senderDetails}
          recipientDetails={recipientDetails}
          changeArrow={this.state.changeArrow}
          weight={this.state.userOrder.package.weight}
          height={this.state.userOrder.package.height}
          length={this.state.userOrder.package.length}
          width={this.state.userOrder.package.width}
          handleSwitchArrow={this.handleSwitchArrow}
          hrLine={this.state.hrLine}
          allDistrict={this.state.allDistrict}
          district={this.state.userOrder.recipientDetails.district}
        />

        {/* <h1
          className="m-2 display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "100px" }}
        >
          Edit order user
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center ">
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
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
                    value={number}
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
                    value={description}
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
                    value={headquarters}
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
                    value={comments}
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
                    value={this.state.userOrder.package.weight}
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
                    value={this.state.userOrder.package.height}
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
                    value={this.state.userOrder.package.length}
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
                    value={this.state.userOrder.package.width}
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
                <h5 className="mb-0">
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
                  ></Link>
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
                          value={senderDetails.name}
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
                          value={senderDetails.surname}
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
                          value={senderDetails.city}
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
                          value={senderDetails.street}
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
                          value={senderDetails.houseNumber}
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
                          value={senderDetails.apartmentNumber}
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
                          value={senderDetails.phoneNumber}
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
                          value={senderDetails.email}
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
                          value={this.state.userOrder.senderDetails.district}
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
                        className="col-xl-5 col-lg-4 col-sm-3 col-form-label"
                      >
                        Name:
                      </label>
                      <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          value={recipientDetails.name}
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
                          value={recipientDetails.surname}
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
                          value={recipientDetails.city}
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
                          value={recipientDetails.street}
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
                          value={recipientDetails.houseNumber}
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
                          value={recipientDetails.apartmentNumber}
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
                          value={recipientDetails.phoneNumber}
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
                          value={recipientDetails.email}
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
                          value={this.state.userOrder.recipientDetails.district}
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
            <button
              className="btn btn-warning  btn-circle btn-lg"
              type="submit"
            >
              EDIT
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
        </form> */}
      </>
    );
  }
}

export default UserOrderEdit;
