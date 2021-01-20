import React, { Component } from "react";
import UserListHeader from "../../UserListHeader";
import UserList from "./UserList";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";
import ModulAPI from "../../../../src/api/ModulAPI";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
      color: "red",
      active: false,
      activeEdit: false,
      count: 1,
      showLessButton: false,
    };
  }

  componentDidMount() {
    ModulAPI.get(this.props.accessToken, "user", "get").then((users) => {
      users.reverse();
      console.log(users);
      this.setState({
        users: users,
      });
    });
    this.getUserRole();
    this.scrollToBottom();
  }

  getUserRole() {
    ModulAPI.get(this.props.accessToken, "current-user", "get").then((user) => {
      console.log(user);
      this.setState({
        user: user,
      });
    });
  }

  setActiveUserId = () => {
    if (this.state.active) {
      return "";
    } else {
      if (this.props.history.location.active) {
        return this.props.history.location.state.userId;
      } else {
        return "";
      }
    }
    // this.state.active
    //   ? ""
    //   : this.props.history.location.active
    //   ? this.props.history.location.state.userId
    //   : ""
  };

  setEditUserId = () => {
    if (this.state.activeEdit) {
      return "";
    } else {
      if (this.props.history.location.activeEdit) {
        return this.props.history.location.state.userEdit;
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
    });
    console.log(this.state.count);
    this.scrollToBottom();
    this.showLessButton();
    this.hideMoreButton();
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

  hideMoreButton = () => {
    if (this.length) {
    }
  };

  getUsers = () => {
    let users = [...this.state.users];
    let n = 5;
    let increment = this.state.count;
    let decrement = this.state.count;

    let arrayLength = users.slice(0, n * increment || decrement);
    let length = arrayLength.length;
    console.log(increment);
    console.log(arrayLength);
    console.log(length);
    console.log(this.state.count);

    return arrayLength.map((user) => (
      <UserList
        key={user.id}
        user={user}
        userId={this.setActiveUserId()}
        userEditid={this.setEditUserId()}
      />
    ));
  };

  render() {
    const { role } = this.state.user;
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">User list</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <UserListHeader />
            {this.getUsers()}
          </table>
          <div className="col-2 offset-5">
            <div className="col-8 offset-2">
              <hr className="hr" style={{ marginTop: "10px" }} />
            </div>
          </div>
          {role === "ROLE_ADMIN" ? (
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
                  style={{ paddingTop: "15px" }}
                  className="btn btn-success btn-circle btn-lg"
                  to="/user/new"
                >
                  CREATE
                </NavLink>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default User;
