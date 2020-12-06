import React, { Component } from "react";
import UserListHeader from "../../UserListHeader";
import UserList from "./UserList";
import { NavLink } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
      color: "red",
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/user/", {
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
      .then((users) => {
        console.log(users.reverse());
        console.log(users[0].id);
        // let newObject = users.slice(0, 1)[0].id;

        console.log(users);
        this.setState({
          users: users,
        });

        // let newObject = users.slice(0, 1)[0];
      })
      .catch((error) => console.log(error));
    this.getUserRole();
  }

  getUserRole() {
    fetch("http://localhost:8000/api/current-user/", {
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
        this.setState({
          user: user,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const users = this.state.users;
    const { role } = this.state.user;

    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">User list</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <UserListHeader />
            {users.map((user) => (
              <UserList key={user.id} user={user} newObject={users[0].id} />
            ))}
          </table>

          {role === "ROLE_ADMIN" ? (
            <div className="text-center">
              <NavLink to="/user/new">Create new</NavLink>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default User;
