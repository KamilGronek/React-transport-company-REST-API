import React, { Component } from "react";
import ModulAPI from "../../../../api/ModulAPI";
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
    const value = e.target.value;
    let userOrder = this.state.userOrder;
    userOrder.headquarters = value;
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
    const value = e.target.value;
    let userOrder = this.state.userOrder;
    userOrder.recipientDetails.district = value;
    this.setState({
      userOrder,
    });
  };

  fetchHeadquarters = () => {
    ModulAPI.get(this.props.accessToken, "headquarters", "get").then(
      (allHeadquarters) => {
        this.setState({
          allHeadquarters: allHeadquarters,
        });
      }
    );
  };

  fetchDistricts = () => {
    ModulAPI.get(this.props.accessToken, "district", "get")
      .then((allDistrict) => {
        this.setState({
          allDistrict: allDistrict,
        });
      })
      .catch((error) => console.log(error));
  };

  getUserOrderEditValues = () => {
    // problem z   headquarters: response.headquarters.id,
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
    ModulAPI.put(
      this.props.accessToken,
      "user-order",
      "put",
      this.props.location.id,
      json,
      "/edit/user"
    ).then((response) => {
      this.props.history.push({
        pathname: "/user-order",
        state: { userOrderEditId: this.props.location.id },
        activeEdit: true,
      });
      return response;
    });
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
      </>
    );
  }
}

export default UserOrderEdit;
