import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, number, description, comments, status } = this.props.userOrder;

    return (
      <>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{number}</td>
            <td>{description}</td>
            <td>{comments}</td>
            <td>{this.props.userOrder.headquarters.name}</td>

            <td>
              <p> weigth:{this.props.userOrder.package.weight}</p>
              <p> width:{this.props.userOrder.package.width}</p>
              <p> height:{this.props.userOrder.package.height}</p>
              <p>length:{this.props.userOrder.package.length}</p>
            </td>

            <td>{this.props.userOrder.sender_details.name}</td>
            <td>{this.props.userOrder.recipient_details.name}</td>
            <td>
              {status === "PROVIDED" ? (
                <span style={{ color: "lightgreen" }}>{status}</span>
              ) : (
                status
              )}
            </td>

            {this.props.userOrder.courier === null ? (
              <span style={{ color: "red" }}> courier expired</span>
            ) : (
              this.props.userOrder.courier.user.name
            )}

            <td>
              <NavLink
                to={{
                  pathname: "/user-order/show",
                  id: id,
                }}
              >
                show
              </NavLink>
              <br></br>
              <NavLink
                to={{
                  pathname: "/user-order/edit",
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
