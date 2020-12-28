import React, { Component } from "react";

class UserDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
        if (response.status === 200) {
          console.log(response);
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.log(error));

    // let users = [...this.state.users];
    // let role = users.map((user) => user.role);
    // console.log(role);
  }

  handleClickDelete = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/user/" + this.props.id, {
      method: "delete",
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 204) {
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .then((response) => {
        this.props.history.push("/user");
      })
      .catch((error) => console.log(error));
  };

  render() {
    let users = [...this.state.users];
    let role = users.map((user) => user.role);
    console.log(role);
    return (
      <>
        {this.state.users.map((user) => user.role) === "ROLE_COURIER" ? (
          ""
        ) : (
          <div className="text-center">
            <button
              className="btn btn-danger  btn-circle btn-lg"
              onClick={this.handleClickDelete}
            >
              DELETE
            </button>
          </div>
        )}
      </>
    );
  }
}

export default UserDelete;
