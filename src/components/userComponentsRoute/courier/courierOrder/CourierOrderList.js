import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class CourierOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, number, description, comments } = this.props.courierOrder;
    const { statusChangeId } = this.props;
    console.log(this.props.statusChangeId);
    return (
      <>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{number}</td>
            <td>{description}</td>
            <td>{comments}</td>
            <td>{this.props.courierOrder.headquarters.name}</td>

            <td>
              <p> weigth:{this.props.courierOrder.package.weight}</p>
              <p> width:{this.props.courierOrder.package.width}</p>
              <p> height:{this.props.courierOrder.package.height}</p>
              <p> length:{this.props.courierOrder.package.length}</p>
            </td>

            <td>{this.props.courierOrder.sender_details.name}</td>
            <td>{this.props.courierOrder.recipient_details.name}</td>
            <td>
              {this.props.courierOrder.status === "PROVIDED" ||
              id === statusChangeId ? (
                <span style={{ color: "lightgreen" }}>
                  {" "}
                  {this.props.courierOrder.status}
                </span>
              ) : (
                this.props.courierOrder.status
              )}
            </td>
            <td>
              {this.props.courierOrder.courier === null ? (
                <span style={{ color: "red" }}> courier expired</span>
              ) : (
                this.props.courierOrder.courier.user.name
              )}
            </td>
            <td>
              <NavLink
                to={{
                  pathname: "/user-order/status",
                  id: id,
                }}
              >
                manage status
              </NavLink>{" "}
            </td>
          </tr>
        </tbody>
      </>
    );
  }
}

export default CourierOrderList;
