import React, { Component } from "react";
import UserOrderListHeader from "./UserOrderListHeader";
import UserOrderList from "./UserOrderList";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";
import ModulAPI from "../../../../api/ModulAPI";

class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrders: [],
      active: false,
      activeEdit: false,
      count: 1,
      showLessButton: false,
    };
  }

  componentDidMount() {
    ModulAPI.get(this.props.accessToken, "user-order", "get").then(
      (userOrders) => {
        userOrders.reverse();
        this.setState({
          userOrders: userOrders,
        });
      }
    );
    this.scrollToBottom();
  }

  setActiveUserId = () => {
    if (this.state.active) {
      return "";
    } else {
      if (this.props.history.location.active) {
        return this.props.history.location.state.userOrderId;
      } else {
        return "";
      }
    }
  };

  setActiveUserOrderId = () => {
    if (this.state.activeEdit) {
      return "";
    } else {
      if (this.props.history.location.activeEdit) {
        return this.props.history.location.state.userOrderEditId;
      } else {
        return "";
      }
    }
  };

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
    let userOrders = [...this.state.userOrders];
    let n = 2;
    let increment = this.state.count;
    let decrement = this.state.count;

    let arrayLength = userOrders.slice(0, n * increment || decrement);
    console.log(arrayLength.length);

    return arrayLength.map((userOrder) => (
      <UserOrderList
        key={userOrder.id}
        userOrder={userOrder}
        userOrderId={this.setActiveUserId()}
        userOrderEditId={this.setActiveUserOrderId()}
      />
    ));
  }

  render() {
    console.log(this.props.history.location.active);
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">User order list</h1>
          </div>
          <table
            className="table table-striped table-hover table-sm table-responsive-sm"
            style={{ marginTop: 30 }}
          >
            <UserOrderListHeader />
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
                      style={{ fontSize: "11px" }}
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
            <div className="text-center">
              <NavLink
                style={{
                  paddingTop: "15px",
                }}
                className="btn btn-success btn-circle btn-lg"
                to="/user-order/new"
              >
                CREATE
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserOrder;
