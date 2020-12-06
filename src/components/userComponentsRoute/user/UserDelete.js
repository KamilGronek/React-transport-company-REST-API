import React, { Component } from "react";

class UserDelete extends Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete(e) {
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
  }

  render() {
    return (
      <>
        <div className="text-center">
          <button
            className="btn btn-danger  btn-circle btn-lg"
            onClick={this.handleClickDelete}
          >
            {" "}
            DELETE
          </button>
        </div>
      </>
    );
  }
}

export default UserDelete;
