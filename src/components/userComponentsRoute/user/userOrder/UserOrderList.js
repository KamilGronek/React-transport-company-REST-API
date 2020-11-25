import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, number, description, comments } = this.props.userOrder;

    return (
      <>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{number}</td>
            <td>{description}</td>
            <td>{comments}</td>
            <td>{this.props.userOrder.headquarters.name}</td>
            {/* <tr> */}
            <td>
              {" "}
              weigth: {this.props.userOrder.package.weight}
              {/* </tr> */}
              {/* <tr> */}
              width:{this.props.userOrder.package.width}
              {/* </tr> */}
              {/* <tr> */}
              height:{this.props.userOrder.package.height}
              {/* </tr> */}
              {/* <tr> */}
              length: {this.props.userOrder.package.length}
            </td>
            {/* </tr> */}
            <td>{this.props.userOrder.sender_details.name}</td>
            <td>{this.props.userOrder.recipient_details.name}</td>
            <td>{this.props.userOrder.status}</td>

            {this.props.userOrder.courier === null ? (
              <span style={{ color: "red" }}> courier expired</span>
            ) : (
              this.props.userOrder.courier.user.name
            )}

            <td>
              <NavLink
                to={{
                  pathname: "/user/user-order/show",
                  id: id,
                }}
              >
                show
              </NavLink>
              <br></br>
              <NavLink
                to={{
                  pathname: "/user/user-order/edit",
                  id: id,
                }}
              >
                edit
              </NavLink>
            </td>
          </tr>
        </tbody>
      </>
    );
  }
}

export default UserList;
