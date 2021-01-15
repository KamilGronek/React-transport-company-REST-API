import React, { Component } from "react";
import ModulAPI from "../../../../api/ModulAPI";

class UserOrderDelete extends Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete(e) {
    e.preventDefault();
    ModulAPI.delete(
      this.props.accessToken,
      "user-order",
      "delete",
      this.props.id,
      this.props.history,
      "/user-order"
    );
  }

  render() {
    return (
      <button
        className="btn btn-danger  btn-circle btn-lg"
        type="submit"
        onClick={this.handleClickDelete}
      >
        DELETE
      </button>
    );
  }
}

export default UserOrderDelete;
