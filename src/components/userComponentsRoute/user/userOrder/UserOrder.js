import React, { Component } from "react";
import UserOrderListHeader from "./UserOrderListHeader";
import UserOrderList from "./UserOrderList";
import { NavLink } from "react-router-dom";

class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrders: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/user-order/", {
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
      .then((userOrders) => {
        this.setState({
          userOrders: userOrders.reverse(),
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const userOrders = this.state.userOrders;

    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">User order list</h1>
          </div>
          <table
            className="table table-striped table-hover table-sm table-responsive-sm"
            style={{ marginTop: 30 }}
          >
            <UserOrderListHeader />
            {userOrders.map((userOrder) => (
              <UserOrderList key={userOrder.id} userOrder={userOrder} />
            ))}
          </table>
          <div className="new">
            <NavLink
              style={{ display: "flex", justifyContent: "center" }}
              to="/user-order/new"
            >
              Create new
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

export default UserOrder;
