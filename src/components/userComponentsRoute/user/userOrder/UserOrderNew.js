import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserOrderNew extends Component {
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
    this.handleSelectSender = this.handleSelectSender.bind(this);
    this.handleSelectRecipient = this.handleSelectRecipient.bind(this);

    this.fetchHeadquarters = this.fetchHeadquarters.bind(this);
    this.fetchDistricts = this.fetchDistricts.bind(this);

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

  handleSelectSender(e) {
    const value = e.target.value;
    let userOrder = this.state.userOrder;
    userOrder.senderDetails.district = value;
    this.setState({
      userOrder,
    });
  }
  handleSelectRecipient(e) {
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

  componentDidMount() {
    this.fetchHeadquarters();
    this.fetchDistricts();
  }

  handleSubmit(e) {
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
          // response.json().then((res) => {
          //   // console.log(res);

          // });

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
    return (
      <>
        <div className="container-fluid ">
          <h1
            className="display-4 d-flex justify-content-center"
            style={{ paddingTop: "30px" }}
          >
            Create user order
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
                    onChange={this.handleSelectRecipient}
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
                Save
              </button>
            </div>
            <div className="d-flex flex-column">
              <NavLink to="/user" style={{ textAlign: "center" }}>
                back to list
              </NavLink>
              <NavLink to="" style={{ textAlign: "center" }}>
                logout
              </NavLink>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default UserOrderNew;

/*----example with column ------ */

/* <div className="container-fluid" style={{ maxWidth: "80em" }}>
          <div className="row">
            <div className="col-lg-3 col-12">empty</div>
            <div className="col-lg-1">
              <div className="d-flex-direction-column">
                <div>
                  <label htmlFor="">Number</label>
                </div>
                <div>
                  <label htmlFor="">Number</label>
                </div>
                <div>
                  <label htmlFor="">Number</label>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-12">
              <div className="d-flex-direction-column">
                <div>
                  <input type="text" id="user" name="username" />
                </div>
                <div>
                  <input type="text" id="user" name="username" />
                </div>
                <div>
                  <input type="text" id="user" name="username" />
                </div>
              </div>
            </div>
            <div className="col-lg-1 col-12">
              <div className="d-flex-direction-column">
                <div>
                  <label htmlFor="">Number</label>
                </div>
                <div>
                  <label htmlFor="">Number</label>
                </div>
                <div>
                  <label htmlFor="">Number</label>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-12">
              <div className="d-flex-direction-column">
                <div>
                  <input type="text" id="user" name="username" />
                </div>
                <div>
                  <input type="text" id="user" name="username" />
                </div>
                <div>
                  <input type="text" id="user" name="username" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12">empty</div>
          </div>
        </div> */
