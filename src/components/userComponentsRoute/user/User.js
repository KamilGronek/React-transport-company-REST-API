import React, { Component } from "react";
import UserListHeader from "../../UserListHeader";
import UserList from "./UserList";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      user: {},
      color: "red",
      active: false,
      count: 1,
      showLessButton: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/user/", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + this.props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((users) => {
        users.reverse();

        console.log(users);
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.log(error));
    this.getUserRole();
    this.scrollToBottom();
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

  // hideLessButton = () => {
  //   if (this.state.count > 1) {
  //     this.setState({
  //       showLessButton: true,
  //     });
  //   } else if (this.state.count == 1) {
  //     this.setState({
  //       showLessButton: false,
  //     });
  //   }
  //   console.log(this.state.showLessButton);
  // };

  getOrders() {
    let users = [...this.state.users];
    let n = 8;
    let increment = this.state.count;
    let decrement = this.state.count;

    let arrayLength = users.slice(0, n * increment || decrement);
    console.log(increment);
    console.log(arrayLength.length);
    console.log(this.state.count);

    return arrayLength.map((user) => (
      <UserList key={user.id} user={user} userId={this.setActiveUserId()} />
    ));
  }

  render() {
    const { role } = this.state.user;

    return (
      <>
        <div className="container" style={{ paddingTop: "100px" }}>
          <div className="text-center">
            <h1 className="display-4">User list</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <UserListHeader />
            {this.getOrders()}
          </table>
          <hr style={{ marginTop: "10px" }} />
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

// divide() {
//   let users = [...this.state.users];
//   const n = 6;
//   let result = [[], [], [], [], [], []];
//   const wordsPerLine = Math.ceil(users.length / 6);
//   for (let line = 0; line < n; line++) {
//     for (let i = 0; i < wordsPerLine; i++) {
//       const value = users[i + line * wordsPerLine];
//       if (!value) continue;
//       result[line].push(value);
//     }
//   }
//   console.log(result);

//   // let id = result[0].map((res) => res.name);
//   // let id0 = id[0];
//   // console.log(id0);
//   // return <div>{id0}</div>;

//   return result[0].map((res) => (
//     <UserList key={res.id} res={res} userId={this.setActiveUserId()} />
//   ));
// }
