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

    const { courierNewId } = this.props;

    return (
      <>
        <tbody>
          <tr>
            <td>
              {id === courierNewId ? <span className="green"> {id} </span> : id}
            </td>
            <td>
              {id === courierNewId ? (
                <span className="green"> {name}</span>
              ) : (
                name
              )}
            </td>
            <td>
              {id === courierNewId ? (
                <span className="green"> {surname}</span>
              ) : (
                surname
              )}
            </td>
            <td>
              {id === courierNewId ? (
                <span className="green"> {role}</span>
              ) : (
                role
              )}
            </td>
            <td>
              {id === courierNewId ? (
                <span className="green"> {phone_number}</span>
              ) : (
                phone_number
              )}
            </td>
            <td>
              {id === courierNewId ? (
                <span className="green"> {username}</span>
              ) : (
                username
              )}
            </td>
            <td>
              {id === courierNewId ? (
                <span className="green"> {district}</span>
              ) : (
                district
              )}
            </td>
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
