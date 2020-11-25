import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import UserOrderDelete from "./UserOrderDelete";

class UserOrderEdit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBase = this.handleChangeBase.bind(this);
    this.handleChangeSenderDetails = this.handleChangeSenderDetails.bind(this);
    this.handleChangeRecipientDetails = this.handleChangeRecipientDetails.bind(
      this
    );
    this.handleChangePackage = this.handleChangePackage.bind(this);
    this.handleChangeHeadquarters = this.handleChangeHeadquarters.bind(this);
    this.handleSelectSenderDistrict = this.handleSelectSenderDistrict.bind(
      this
    );
    this.handleSelectRecipientDistrict = this.handleSelectRecipientDistrict.bind(
      this
    );

    this.fetchHeadquarters = this.fetchHeadquarters.bind(this);
    this.fetchDistricts = this.fetchDistricts.bind(this);
    this.getUserOrderEditValues = this.getUserOrderEditValues.bind(this);

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
    };
  }

  handleChangeBase(e) {
    console.log(this.state);
    const value = e.target.value;
    const name = e.target.name;
    let userOrder = this.state.userOrder;
    userOrder[name] = value;
    this.setState({
      userOrder,
    });
    console.log(this.state);
  }

  handleChangePackage(e) {
    const value = e.target.value;
    const name = e.target.name;
    let packageValue = this.state.userOrder.package;
    packageValue[name] = value;
    this.setState({
      packageValue,
    });
  }

  handleChangeSenderDetails(e) {
    const value = e.target.value;
    const name = e.target.name;
    let senderDetails = this.state.userOrder.senderDetails;
    senderDetails[name] = value;
    this.setState({
      senderDetails,
    });
  }

  handleChangeRecipientDetails(e) {
    const value = e.target.value;
    const name = e.target.name;
    let recipientDetails = this.state.userOrder.recipientDetails;
    recipientDetails[name] = value;
    this.setState({
      recipientDetails,
    });
  }
  //---------------------------------------------------------

  handleChangeHeadquarters(e) {
    let userOrder = this.state.userOrder;
    userOrder.headquarters = e.target.value;
    this.setState({
      userOrder,
    });
  }

  handleSelectSenderDistrict(e) {
    let userOrder = this.state.userOrder;
    userOrder.senderDetails.district = e.target.value;
    this.setState({
      userOrder,
    });
  }
  handleSelectRecipientDistrict(e) {
    let userOrder = this.state.userOrder;
    userOrder.recipientDetails.district = e.target.value;
    this.setState({
      userOrder,
    });
  }

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

  getUserOrderEditValues() {
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
  }

  componentDidMount() {
    this.fetchHeadquarters();
    this.fetchDistricts();
    this.getUserOrderEditValues();
  }

  handleSubmit(e) {
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
          this.props.history.push("/user/user-order");
          return response;
        }
        if (response.status === 400) {
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      number,
      description,
      comments,
      senderDetails,
      recipientDetails,
    } = this.state.userOrder;

    return (
      <>
        <div className="container-fluid ">
          <h1
            className="display-4 d-flex justify-content-center"
            style={{ paddingTop: "30px" }}
          >
            User Order Edit
          </h1>

          <form onSubmit={this.handleSubmit}>
            <div className="row row-width">
              <div
                className="col-lg-3 col-md-2 col-sm-2 col-12"
                style={{ backgroundColor: "lightblue" }}
              >
                empty
              </div>
              <div
                className="col-lg-3 col-md-4 col-sm-4 col-12"
                style={{ backgroundColor: "red" }}
              >
                {" "}
                <strong>Details:</strong>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="user">Number:</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      value={number}
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
                      type="text"
                      id="description"
                      name="description"
                      value={description}
                      onChange={this.handleChangeBase}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="user">Headquarters:</label>
                  </div>
                  <select
                    name="headquarters"
                    value={this.state.userOrder.headquarters}
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
                      type="text"
                      id="comments"
                      name="comments"
                      value={comments}
                      onChange={this.handleChangeBase}
                    />
                  </div>
                </div>
                <br />
              </div>
              <div
                className="col-lg-3 col-md-4 col-sm-4 col-12"
                style={{ backgroundColor: "lightblue" }}
              >
                <strong>Package:</strong>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="user">Weight:</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={this.state.userOrder.package.weight}
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
                      type="number"
                      id="height"
                      name="height"
                      value={this.state.userOrder.package.height}
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
                      type="number"
                      id="length"
                      name="length"
                      value={this.state.userOrder.package.length}
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
                      type="number"
                      id="width"
                      name="width"
                      value={this.state.userOrder.package.width}
                      onChange={this.handleChangePackage}
                    />
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-2 col-sm-2 col-12"
                style={{ backgroundColor: "red" }}
              >
                empty
              </div>
            </div>
            <div className="row row-width">
              <div
                className="col-lg-3 col-md-2 col-sm-2 col-12"
                style={{ backgroundColor: "lightblue" }}
              >
                empty
              </div>

              <div
                className="col-lg-3 col-md-4 col-sm-4 col-12"
                style={{ backgroundColor: "red" }}
              >
                {" "}
                <strong>Sender details:</strong>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="user">Name:</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={senderDetails.name}
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
                      type="text"
                      id="surname"
                      name="surname"
                      value={senderDetails.surname}
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
                      type="text"
                      id="city"
                      name="city"
                      value={senderDetails.city}
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
                      type="text"
                      id="street"
                      name="street"
                      value={senderDetails.street}
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
                      type="text"
                      id="houseNumber"
                      name="houseNumber"
                      value={senderDetails.houseNumber}
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
                      type="text"
                      id="apartmentNumber"
                      name="apartmentNumber"
                      value={senderDetails.apartmentNumber}
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
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={senderDetails.phoneNumber}
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
                      type="text"
                      id="email"
                      name="email"
                      value={senderDetails.email}
                      onChange={this.handleChangeSenderDetails}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="user">District:</label>
                  </div>
                  <select
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
              <div
                className="col-lg-3 col-md-4 col-sm-4 col-12"
                style={{ backgroundColor: "lightblue" }}
              >
                {" "}
                <strong>Recipient details:</strong>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="name">Name:</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={recipientDetails.name}
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
                      type="text"
                      id="surname"
                      name="surname"
                      value={recipientDetails.surname}
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
                      type="text"
                      id="city"
                      name="city"
                      value={recipientDetails.city}
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
                      type="text"
                      id="street"
                      name="street"
                      value={recipientDetails.street}
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
                      type="text"
                      id="houseNumber"
                      name="houseNumber"
                      value={recipientDetails.houseNumber}
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
                      type="text"
                      id="apartmentNumber"
                      name="apartmentNumber"
                      value={recipientDetails.apartmentNumber}
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
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={recipientDetails.phoneNumber}
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
                      type="text"
                      id="email"
                      name="email"
                      value={recipientDetails.email}
                      onChange={this.handleChangeRecipientDetails}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <label htmlFor="district">District:</label>
                  </div>
                  <select
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
              <div
                className="col-lg-3 col-md-2 col-sm-2 col-12"
                style={{ backgroundColor: "red" }}
              >
                empty
              </div>
            </div>
            <div className="text-center" style={{ marginTop: 20 }}>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
            <div className="text-center">
              <NavLink to="/user" style={{ textAlign: "center" }}>
                back to list
              </NavLink>
            </div>
            <div className="text-center">
              <UserOrderDelete
                {...this.props}
                accessToken={this.props.accessToken}
                id={this.props.location.id}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default UserOrderEdit;
