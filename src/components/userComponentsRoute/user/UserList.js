import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, name, surname, role, phone_number, username } = this.props.user;

    return (
      <>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{role}</td>
            <td>{phone_number}</td>
            <td>{username}</td>
            <td>
              <NavLink
                to={{
                  pathname: "/user/show",
                  id: id,
                }}
              >
                show
              </NavLink>
              <br></br>
              <NavLink
                to={{
                  pathname: "/user/edit",
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
