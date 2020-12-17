import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, name, surname, role, phone_number, username } = this.props.user;
    const { userId } = this.props;

    return (
      <>
        <tbody>
          <tr>
            <td>
              {id === userId ? <span className="green"> {id} </span> : id}
            </td>
            <td>
              {id === userId ? <span className="green"> {name}</span> : name}
            </td>
            <td>
              {id === userId ? (
                <span className="green"> {surname}</span>
              ) : (
                surname
              )}
            </td>
            <td>
              {id === userId ? <span className="green"> {role}</span> : role}
            </td>
            <td>
              {id === userId ? (
                <span className="green"> {phone_number}</span>
              ) : (
                phone_number
              )}
            </td>
            <td>
              {id === userId ? (
                <span className="green"> {username}</span>
              ) : (
                username
              )}
            </td>
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
