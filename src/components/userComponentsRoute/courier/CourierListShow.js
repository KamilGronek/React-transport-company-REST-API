import React, { Component } from "react";
import CourierListHeader from "../../CourierListHeader";
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
      deleteInfo: false,
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

  alertDelete = () => {
    this.setState({
      deleteInfo: true,
    });
  };

  render() {
    console.log(this.props.accessToken);
    // console.log(this.props.deleteInfo);

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
            <CourierListHeader />
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{role}</td>
                <td>{phone_number}</td>
                <td>{username}</td>
                <td>{district}</td>
                <td className="d-flex justify-content-around">
                  <NavLink to="/courier"> back to list </NavLink>
                  <NavLink
                    to={{
                      pathname: "/courier/edit",
                      id: courrierId,
                    }}
                  >
                    edit
                  </NavLink>
                  {/* {this.state.deleteInfo && alert("Can't delete course")} */}

                  <CourierDelete
                    {...this.props}
                    accessToken={this.props.accessToken}
                    id={this.props.location.id}
                    alertDelete={this.alertDelete}
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
