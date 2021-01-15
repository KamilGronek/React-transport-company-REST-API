import React, { Component } from "react";
import ModulAPI from "../../../../src/api/ModulAPI";
class UserDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    ModulAPI.get(this.props.accessToken, "user", "get").then((users) => {
      console.log(users);
      this.setState({
        users: users,
      });
    });
  }

  handleClickDelete = (e) => {
    e.preventDefault();
    ModulAPI.delete(
      this.props.accessToken,
      "user",
      "delete",
      this.props.id,
      this.props.history,
      "/user"
    );
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
