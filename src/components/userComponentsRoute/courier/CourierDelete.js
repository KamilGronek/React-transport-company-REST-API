import React, { Component } from "react";
// import { Popover } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

class CourierDelete extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     deleteInfo: this.props.deleteInfo,
  //   };
  // }

  handleClickDelete = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/courier/" + this.props.id, {
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
        this.props.history.push("/courier");
      })
      .catch((error) => console.log(error));

    // this.setState({
    //   deleteInfo: !this.state.deleteInfo,
    // });
    this.props.alertDelete();
  };

  render() {
    return (
      <>
        <div className="text-center">
          <p ref={(ref) => (this.fooRef = ref)} data-tip="tooltip"></p>
          <button
            onClick={() => {
              ReactTooltip.show(this.fooRef);
              ReactTooltip.hide(this.fooRef);
            }}
          >
            Click
          </button>
          <ReactTooltip />

          <button
            className="btn btn-danger  btn-circle btn-lg"
            type="submit"
            onClick={this.handleClickDelete}
          >
            DELETE
          </button>
        </div>
      </>
    );
  }
}

export default CourierDelete;
