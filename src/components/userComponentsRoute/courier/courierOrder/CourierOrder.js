import React, { Component } from "react";
import CourierOrderHeader from "./CourierOrderHeader";
import CourierOrderList from "./CourierOrderList";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";

class CourierOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courierOrders: [],
      user: {},
      count: 1,
      showLessButton: false,
    };
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

  componentDidMount() {
    fetch("http://localhost:8000/api/courier-order/", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((courierOrders) => {
        courierOrders.reverse();

        this.setState({
          courierOrders: courierOrders,
        });
      })
      .catch((error) => console.log(error));
    this.getUserRole();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "ContainerElementID",
    });
  }

  handleIncrementCount = () => {
    this.setState({
      count: this.state.count + 1,
      showLessButton: false,
    });
    console.log(this.state.count);
    this.scrollToBottom();
    this.showLessButton();
  };

  handleDecrementCount = () => {
    this.setState({
      count: this.state.count - 1,
    });
    console.log(this.state.count);
  };

  showLessButton = () => {
    this.setState({
      showLessButton: true,
    });
  };

  getOrders() {
    let courierOrders = [...this.state.courierOrders];
    let n = 2;
    let increment = this.state.count;
    let decrement = this.state.count;

    let arrayLength = courierOrders.slice(0, n * increment || decrement);
    console.log(arrayLength.length);
    return arrayLength.map((courierOrder) => (
      <CourierOrderList key={courierOrder.id} courierOrder={courierOrder} />
    ));
  }

  render() {
    // const courierOrders = this.state.courierOrders;

    const { role } = this.state.user;
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">
              {role === "ROLE_ADMIN"
                ? "Courier order index"
                : "Courier order list"}
            </h1>
          </div>
          <table
            className="table table-striped table-hover table-sm table-responsive-sm"
            style={{ marginTop: 30 }}
          >
            <CourierOrderHeader />
            {this.getOrders()}
          </table>
          <div className="col-2 offset-5">
            <div className="col-8 offset-2">
              <hr className="hr" style={{ marginTop: "10px" }} />
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className=" row justify-content-center">
              <h5 className="mb-0 ">
                <Link
                  to="#"
                  className="btn btn-link collapsed"
                  style={{ fontSize: "11px" }}
                  type="button"
                  onClick={this.handleIncrementCount}
                >
                  Show more <span style={{ visibility: "hidden" }}>xx</span>
                  <i className="arrow down"></i>
                </Link>
              </h5>
            </div>
            <div className=" row justify-content-center">
              <h5 className="mb-0 ">
                {this.state.count > 1 ? (
                  <>
                    <Link
                      to="#"
                      className={
                        this.state.showLessButton
                          ? "visible btn btn-link collapsed"
                          : "hidden btn btn-link collapsed"
                      }
                      style={{ visibility: "visible", fontSize: "11px" }}
                      type="button"
                      onClick={this.handleDecrementCount}
                    >
                      Show less
                      <span style={{ visibility: "hidden" }}>xxxx</span>
                      <i className="arrow up"></i>
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CourierOrder;
