import React, { Component } from "react";
import CourierListHeader from "../../CourierListHeader";
import CourierList from "./CourierList";

import { NavLink } from "react-router-dom";

class Courier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couriers: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courier/", {
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
      .then((couriers) => {
        this.setState({
          couriers: couriers,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const couriers = this.state.couriers;
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">Courier list</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <CourierListHeader />
            {couriers.map((courier) => (
              <CourierList key={courier.id} courier={courier} />
            ))}
          </table>
          <div className="text-center">
            <NavLink to="/user/courier/new">Create new</NavLink>
          </div>
        </div>
      </>
    );
  }
}

export default Courier;
