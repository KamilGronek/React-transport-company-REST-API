import React, { Component } from "react";
import UserOrderNewForm from "./UserOrderNewForm";
import { NavLink } from "react-router-dom";
// import { Link } from "react-scroll";
import UserOrderNewPiece from "./UserOrderNewPiece";
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

  // render() {
  //   return (
  //     <UserOrderNewForm
  //       handleSubmit={this.handleSubmit}
  //       handleChangeBase={this.handleChangeBase}
  //       handleChangeHeadquarters={this.handleChangeHeadquarters}
  //       allDistrict={this.state.allDistrict}
  //       handleChangePackage={this.handleChangePackage}
  //       changeArrow={this.state.changeArrow}
  //       handleSwitchArrow={this.handleSwitchArrow}
  //       hrLine={this.state.hrLine}
  //       allHeadquarters={this.state.allHeadquarters}
  //       handleChangeSenderDetails={this.handleChangeSenderDetails}
  //       handleSelectSenderDistrict={this.handleSelectSenderDistrict}
  //       handleChangeRecipientDetails={this.handleChangeRecipientDetails}
  //     />
  //   );
  // }

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
          <UserOrderNewPiece
            handleChangeBase={this.handleChangeBase}
            handleChangeHeadquarters={this.handleChangeHeadquarters}
            allHeadquarters={this.state.allHeadquarters}
            handleChangePackage={this.handleChangePackage}
            hrLine={this.state.hrLine}
            handleSwitchArrow={this.handleSwitchArrow}
            changeArrow={this.state.changeArrow}
            handleChangeSenderDetails={this.handleChangeSenderDetails}
            handleSelectSenderDistrict={this.handleSelectSenderDistrict}
            handleChangeRecipientDetails={this.handleChangeRecipientDetails}
            allDistrict={this.state.allDistrict}
            handleSelectRecipientDistrict={this.handleSelectRecipientDistrict}
          />
        </form>
      </>
    );
  }
}

export default UserOrderNew;
