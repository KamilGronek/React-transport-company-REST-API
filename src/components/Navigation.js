import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import ModulAPI from "../../src/api/ModulAPI";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      accessToken: this.props.accessToken,
      hideNav: false,
    };
  }

  componentDidMount() {
    ModulAPI.get(this.props.accessToken, "current-user", "get").then((user) => {
      this.setState({
        user: user,
      });
    });
  }

  handleLogout = () => {
    this.setState({
      user: {},
      accessToken: null,
    });
    this.removeAccessToken();
    this.props.reloadComponent();
  };

  removeAccessToken = () => {
    localStorage.setItem("accessToken", null);
  };

  render() {
    const { name, email, role } = this.state.user;

    return (
      <>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
          style={{
            padding: "0 30 0 30",

            // boxShadow:
            //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <NavLink className="navbar-brand" to="#">
            <div className="logo">
              <img src={"images/logo.png"} style={{ width: 150 }} alt="" />
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/user"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="/user">
                    User list
                  </NavLink>
                  {role === "ROLE_ADMIN" ? (
                    <NavLink className="dropdown-item" to="/user/new">
                      Create new
                    </NavLink>
                  ) : (
                    ""
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/user-order"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User Order
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="/user-order">
                    User order list
                  </NavLink>
                  <NavLink className="dropdown-item" to="/user-order/new">
                    User order new
                  </NavLink>
                </div>
              </li>
              {role === "ROLE_ADMIN" && "ROLE_USER" ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="/courier"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Courier
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to="/courier">
                      Courier list
                    </NavLink>
                    <NavLink className="dropdown-item" to="/courier/new">
                      Create new
                    </NavLink>
                  </div>
                </li>
              ) : (
                ""
              )}

              {role === "ROLE_ADMIN" || "ROLE_COURIER" ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="/courier-order"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Courier Order
                  </NavLink>

                  {role === "ROLE_ADMIN" ? (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item" to="/courier-order">
                        list for all
                      </NavLink>
                    </div>
                  ) : (
                    ""
                  )}
                  {role === "ROLE_COURIER" ? (
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item" to="/courier-order">
                        list for current courier
                      </NavLink>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              ) : (
                ""
              )}

              <li className="nav-item">
                <NavLink className="nav-link disabled" to="#">
                  <i>
                    Name & Surname: <strong>{name}</strong>
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link disabled" to="#">
                  <i>
                    E-mail: <strong>{email}</strong>
                  </i>{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link disabled" to="#">
                  <i>
                    Role: <strong>{role}</strong>{" "}
                  </i>
                </NavLink>
              </li>
            </ul>
            <NavLink
              to="/login"
              onClick={this.handleLogout}
              style={{ marginRight: "30px" }}
            >
              logout
            </NavLink>
          </div>
        </nav>
      </>
    );
  }
}
export default Navigation;
