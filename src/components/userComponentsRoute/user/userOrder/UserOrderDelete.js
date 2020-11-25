import React, { Component } from "react";

class UserOrderDelete extends Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete(e) {
    e.preventDefault();
    fetch("http://localhost:8000/api/user-order/" + this.props.id, {
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
        this.props.history.push("/user/user-order");
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <button
        className="btn btn-primary"
        type="submit"
        onClick={this.handleClickDelete}
      >
        delete
      </button>
    );
  }
}

export default UserOrderDelete;
