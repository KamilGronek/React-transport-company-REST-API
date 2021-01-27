// import React, { Component } from "react";
import React, { useEffect, useReducer } from "react";
import UserListHeader from "../../UserListHeader";
import UserList from "./UserList";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";
import ModulAPI from "../../../../src/api/ModulAPI";
import { initialUserListState } from "../../../../src/InitialState";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function User(props) {
  const [state, setState] = useReducer(stateReducer, initialUserListState);

  useEffect(() => {
    ModulAPI.get(props.accessToken, "user", "get").then((users) => {
      users.reverse();
      console.log(users);
      setState({
        users: users,
      });
    });
    getUserRole();
    scrollToBottom();
  }, []);

  const getUserRole = () => {
    ModulAPI.get(props.accessToken, "current-user", "get").then((user) => {
      console.log(user);
      setState({
        user: user,
      });
    });
  };

  const setActiveUserId = () => {
    if (state.active) {
      return "";
    } else {
      if (props.history.location.active) {
        return props.history.location.state.userId;
      } else {
        return "";
      }
    }
  };

  const setEditUserId = () => {
    if (state.activeEdit) {
      return "";
    } else {
      if (props.history.location.activeEdit) {
        return props.history.location.state.userEdit;
      } else {
        return "";
      }
    }
  };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "ContainerElementID",
    });
  };

  const handleIncrementCount = () => {
    setState({
      count: state.count + 1,
    });
    console.log(state.count);
    scrollToBottom();
    showLessButton();
    // hideMoreButton();
  };

  const handleDecrementCount = () => {
    setState({
      count: state.count - 1,
    });
    // console.log(this.state.count);
  };

  const showLessButton = () => {
    setState({
      showLessButton: true,
    });
  };

  const getUsers = () => {
    let users = [...state.users];
    let n = 5;
    let increment = state.count;
    let decrement = state.count;

    let arrayLength = users.slice(0, n * increment || decrement);
    let length = arrayLength.length;

    // console.log(increment);
    // console.log(arrayLength);
    console.log(length);
    // console.log(this.state.count);

    return arrayLength.map((user) => (
      <UserList
        key={user.id}
        user={user}
        userId={setActiveUserId()}
        userEditid={setEditUserId()}
      />
    ));
  };

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="display-4">User list</h1>
        </div>
        <table className="table table-striped table-hover table-sm table-responsive-sm">
          <UserListHeader />
          {getUsers()}
        </table>
        <div className="col-2 offset-5">
          <div className="col-8 offset-2">
            <hr className="hr" style={{ marginTop: "10px" }} />
          </div>
        </div>
        {state.user.role === "ROLE_ADMIN" ? (
          <div className="d-flex flex-column">
            <div className=" row justify-content-center">
              <h5 className="mb-0 ">
                <Link
                  to="#"
                  className="btn btn-link collapsed"
                  style={{ fontSize: "11px" }}
                  type="button"
                  onClick={handleIncrementCount}
                >
                  Show more <span style={{ visibility: "hidden" }}>xx</span>
                  <i className="arrow down"></i>
                </Link>
              </h5>
            </div>
            <div className=" row justify-content-center">
              <h5 className="mb-0 ">
                {state.count > 1 ? (
                  <>
                    <Link
                      to="#"
                      className={
                        state.showLessButton
                          ? "visible btn btn-link collapsed"
                          : "hidden btn btn-link collapsed"
                      }
                      style={{ fontSize: "11px" }}
                      type="button"
                      onClick={handleDecrementCount}
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

export default User;
