import React, { Component } from "react";
import CourierOrderHeader from "./CourierOrderHeader";
import CourierOrderList from "./CourierOrderList";
// import {NavLink} from "react-router-dom";

class CourierOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courierOrders: [],
      user: {},
    };
  }

  getUserRole() {
    fetch("http://localhost:8000/api/current-user/", {
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
      .then((user) => {
        this.setState({
          user: user,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courier-order/", {
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
      .then((courierOrders) => {
        this.setState({
          courierOrders: courierOrders,
        });
      })
      .catch((error) => console.log(error));

    this.getUserRole();
  }

  render() {
    const courierOrders = this.state.courierOrders;

    const { role } = this.state.user;
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">
              {role === "ROLE_ADMIN"
                ? "Courier order index"
                : "Courier order list"}
            </h1>
          </div>
          <table
            className="table table-striped table-hover table-sm table-responsive-sm"
            style={{ marginTop: 30 }}
          >
            <CourierOrderHeader />
            {courierOrders.map((courierOrder) => (
              <CourierOrderList
                key={courierOrder.id}
                courierOrder={courierOrder}
              />
            ))}
          </table>
        </div>
      </>
    );
  }
}

export default CourierOrder;
