import React, { Component } from "react";

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
          this.props.history.push("/user/courier-order");
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
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="bg-secondary">
              <h1
                className="display-4 d-flex justify-content-center"
                style={{ paddingTop: "30px" }}
              >
                Edit status
              </h1>
              <div
                className="d-flex justify-content-center"
                style={{ paddingTop: "30px" }}
              >
                <form onSubmit={this.handleSubmit}>
                  <div className="d-flex flex-column">
                    <div className="row">
                      <div className="col">
                        <div className="float-right">
                          <label
                            htmlFor="user_order_admin_status_status"
                            className="required"
                          >
                            Status
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="float-left">
                          <select
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
                  <button
                    type="submit"
                    className="btn d-flex justify-content-center btn btn-primary"
                    style={{ margin: "0 185px", marginTop: "20px" }}
                  >
                    Save
                  </button>
                  <input
                    type="hidden"
                    id="user_order_admin_status__token"
                    name="user_order_admin_status[_token]"
                    defaultValue="9pJ3SzXh2RDu2SNAwEBGQS_5UEkxFiO3XPQdwUCyNNM"
                  />
                </form>
              </div>
              <div
                className="d-flex flex-column"
                style={{ paddingTop: "10px" }}
              >
                <a href="/user-order/" style={{ textAlign: "center" }}>
                  back to list
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserOrderStatusChange;
