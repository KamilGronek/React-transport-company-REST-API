import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, name, surname, role, phone_number, username } = this.props.user;
    const { userId } = this.props;
    const { userEditid } = this.props;

    console.log(this.props.userEditid);
    return (
      <>
        <tbody>
          <tr>
            <td>
              {id === userId || id === userEditid ? (
                <span className="green"> {id} </span>
              ) : (
                id
              )}
            </td>
            <td>
              {id === userId || id === userEditid ? (
                <span className="green"> {name}</span>
              ) : (
                name
              )}
            </td>
            <td>
              {id === userId || id === userEditid ? (
                <span className="green"> {surname}</span>
              ) : (
                surname
              )}
            </td>
            <td>
              {id === userId || id === userEditid ? (
                <span className="green"> {role}</span>
              ) : (
                role
              )}
            </td>
            <td>
              {id === userId || id === userEditid ? (
                <span className="green"> {phone_number}</span>
              ) : (
                phone_number
              )}
            </td>
            <td>
              {id === userId || id === userEditid ? (
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
