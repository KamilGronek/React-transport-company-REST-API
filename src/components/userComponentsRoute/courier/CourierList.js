import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CourierList extends Component {
  render() {
    const {
      id,
      name,
      surname,
      role,
      phone_number,
      username,
    } = this.props.courier.user;

    const district = this.props.courier.district.name;
    const courierId = this.props.courier.id;

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
            <td>{district}</td>
            <td>
              <NavLink
                to={{
                  pathname: "/courier/show",
                  id: courierId,
                }}
              >
                show
              </NavLink>
              <br></br>
              <NavLink
                to={{
                  pathname: "/courier/edit",
                  id: courierId,
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

export default CourierList;
