import React, { Component } from "react";
import UserOrderListHeader from "./UserOrderListHeader";
import { NavLink } from "react-router-dom";
import UserOrderDelete from "./UserOrderDelete";

//
class UserOrderListShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrder: {
        headquarters: {},
        package: {},
        senderDetails: {},
        recipientDetails: {},
        status: "",
        courier: {
          user: {},
        },
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/user-order/" + this.props.location.id, {
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
      .then((userOrderRes) => {
        // console.log(userOrderRes);
        this.setState({
          userOrder: {
            id: userOrderRes.id,
            number: userOrderRes.number,
            description: userOrderRes.description,
            comments: userOrderRes.comments,
            headquarters: userOrderRes.headquarters,
            package: userOrderRes.package,
            senderDetails: userOrderRes.sender_details,
            recipientDetails: userOrderRes.recipient_details,
            status: userOrderRes.status,
            courier: {
              user: userOrderRes.courier.user,
            },
          },
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { id, number, description, comments, status } = this.state.userOrder;
    const { weight, width, height, length } = this.state.userOrder.package;

    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">User order show</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <UserOrderListHeader />
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{number}</td>
                <td>{description}</td>
                <td>{comments}</td>
                <td>{this.state.userOrder.headquarters.name}</td>
                <tr>
                  <td> weigth:</td>
                  <td> {weight}</td>
                </tr>
                <tr>
                  <td> width:</td>
                  <td> {width}</td>
                </tr>
                <tr>
                  <td> height:</td>
                  <td> {height}</td>
                </tr>
                <tr>
                  <td> length:</td>
                  <td> {length}</td>
                </tr>
                <td>{this.state.userOrder.senderDetails.name}</td>
                <td>{this.state.userOrder.recipientDetails.name}</td>
                <td>{status}</td>
                <td>{this.state.userOrder.courier.user.name}</td>

                <td className="d-flex flex-column align-items-center">
                  <NavLink to="/user-order"> back to list </NavLink>
                  <NavLink
                    to={{
                      pathname: "/user-order/edit",
                      id: id,
                    }}
                  >
                    edit
                  </NavLink>
                  <UserOrderDelete
                    {...this.props}
                    accessToken={this.props.accessToken}
                    id={this.props.location.id}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default UserOrderListShow;
