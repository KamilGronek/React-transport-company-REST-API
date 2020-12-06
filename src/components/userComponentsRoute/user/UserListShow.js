import React, { Component } from "react";
import UserListHeader from "../../UserListHeader";
import { NavLink } from "react-router-dom";
import UserDelete from "./UserDelete";
class UserListShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/user/" + this.props.location.id, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        this.setState({
          user: user,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { id, name, surname, role, phone_number, username } = this.state.user;

    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">User show</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <UserListHeader />
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{role}</td>
                <td>{phone_number}</td>
                <td>{username}</td>
                <td class="d-flex justify-content-around">
                  <NavLink to="/user"> back to list </NavLink>

                  <NavLink
                    to={{
                      pathname: "/user/edit",
                      id: id,
                    }}
                  >
                    edit
                  </NavLink>

                  <UserDelete
                    {...this.props}
                    accessToken={this.props.accessToken}
                    id={this.props.location.id}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default UserListShow;
