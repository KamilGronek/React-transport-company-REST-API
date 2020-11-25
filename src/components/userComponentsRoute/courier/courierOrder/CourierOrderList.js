import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, number, description, comments } = this.props.courierOrder;

    // const courierName = this.props.courierOrder;
    // const courierName2 = courierName.courier.user.name

    return (
      <>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{number}</td>
            <td>{description}</td>
            <td>{comments}</td>
            <td>{this.props.courierOrder.headquarters.name}</td>
            {/* <tr> */}
            <td>
              {" "}
              weigth: {this.props.courierOrder.package.weight}
              {/* </tr> */}
              {/* <tr> */}
              width:{this.props.courierOrder.package.width}
              {/* </tr> */}
              {/* <tr> */}
              height:{this.props.courierOrder.package.height}
              {/* </tr> */}
              {/* <tr> */}
              length: {this.props.courierOrder.package.length}
            </td>
            {/* </tr> */}
            <td>{this.props.courierOrder.sender_details.name}</td>
            <td>{this.props.courierOrder.recipient_details.name}</td>
            <td>{this.props.courierOrder.status}</td>
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
                  pathname: "/user/user-order/status",
                  id: id,
                }}
              >
                manage status
              </NavLink>
            </td>
          </tr>
        </tbody>
      </>
    );
  }
}

export default UserList;
