import React, { Component } from "react";
import UserListHeader from "../../UserListHeader";
import { NavLink } from "react-router-dom";
import CourierDelete from "./CourierDelete";
class UserListShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courier: {
        user: {},
        district: {},
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courier/" + this.props.location.id, {
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
      .then((courier) => {
        this.setState({
          courier: courier,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.props.accessToken);

    const {
      id,
      name,
      surname,
      role,
      phone_number,
      username,
    } = this.state.courier.user;

    const district = this.state.courier.district.name;
    const courrierId = this.state.courier.id;

    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4">Courier show</h1>
          </div>
          <table className="table table-striped table-hover table-sm table-responsive-sm">
            <UserListHeader />
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{role}</td>
                <td>{phone_number}</td>
                <td>{username}</td>
                <td>{district}</td>
                <td>
                  <NavLink to="/user/courier"> back to list </NavLink>
                  <NavLink
                    to={{
                      pathname: "/user/courier/edit",
                      id: courrierId,
                    }}
                  >
                    edit
                  </NavLink>

                  <CourierDelete
                    {...this.props}
                    accessToken={this.props.accessToken}
                    id={this.props.location.id}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default UserListShow;
