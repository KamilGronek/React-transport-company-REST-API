import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserOrderStatusChange extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    super(props);
    this.state = {
      changeStatus: {
        status: "",
      },
      userOrderStatuses: [],
    };
  }

  handleChangeStatus(e) {
    const value = e.target.value;
    let changeStatus = this.state.changeStatus;
    changeStatus.status = value;
    this.setState({
      changeStatus,
    });
  }

  componentDidMount() {
    fetch(
      "http://localhost:8000/api/user-order/" +
        this.props.location.id +
        "/status",
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + this.props.accessToken,
          "Content-Type": "application/json",
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((userOrderStatuses) => {
        this.setState({
          userOrderStatuses: userOrderStatuses,
        });
        this.setState({
          changeStatus: {
            status: this.state.userOrderStatuses[0].value,
          },
        });
      })

      .catch((error) => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();
    let json = JSON.stringify(this.state.changeStatus);
    fetch(
      "http://localhost:8000/api/user-order/" +
        this.props.location.id +
        "/status",
      {
        method: "put",
        body: json,
        headers: new Headers({
          Authorization: "Bearer " + this.props.accessToken,
          "Content-Type": "application/json",
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push("/courier-order");
          return response;
        }
        if (response.status === 400) {
          return response;
        }
        throw new Error("Something went wrong...");
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        <h1
          className="display-4 d-flex justify-content-center"
          style={{ paddingTop: "100px" }}
        >
          Edit status
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center">
            <div
              className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light "
              style={{ borderRadius: "10px" }}
            >
              <br />
              <div className="form-group row">
                <label
                  htmlFor="user_order_admin_status_status"
                  className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                >
                  Status:
                </label>

                <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                  <select
                    className="form-control"
                    name="status"
                    onChange={this.handleChangeStatus}
                    value={this.state.changeStatus.status}
                  >
                    {this.state.userOrderStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 20 }}>
            <button
              type="submit"
              className="btn btn-warning  btn-circle btn-lg"
            >
              EDIT
            </button>
          </div>
          <br />
          <div className="d-flex flex-column">
            <NavLink to="/courier-order" style={{ textAlign: "center" }}>
              back to list
            </NavLink>
          </div>
        </form>
      </>
    );
  }
}

export default UserOrderStatusChange;
