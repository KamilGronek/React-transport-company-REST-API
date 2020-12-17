import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserList extends Component {
  render() {
    const { id, number, description, comments, status } = this.props.userOrder;
    const { userOrderId } = this.props;
    return (
      <>
        <tbody>
          <tr>
            <td>
              {id === userOrderId ? <span className="green"> {id} </span> : id}
            </td>
            <td>
              {id === userOrderId ? (
                <span className="green"> {number}</span>
              ) : (
                number
              )}
            </td>
            <td>
              {id === userOrderId ? (
                <span className="green"> {description}</span>
              ) : (
                description
              )}
            </td>
            <td>
              {id === userOrderId ? (
                <span className="green"> {comments}</span>
              ) : (
                comments
              )}
            </td>
            <td>
              {id === userOrderId ? (
                <span className="green">
                  {" "}
                  {this.props.userOrder.headquarters.name}
                </span>
              ) : (
                this.props.userOrder.headquarters.name
              )}
            </td>
            <td>
              {id === userOrderId ? (
                <p className="green">
                  weigth:{this.props.userOrder.package.weight}
                </p>
              ) : (
                <p>weigth:{this.props.userOrder.package.weight}</p>
              )}
              {id === userOrderId ? (
                <p className="green">
                  width:{this.props.userOrder.package.width}
                </p>
              ) : (
                <p>width:{this.props.userOrder.package.width}</p>
              )}

              {id === userOrderId ? (
                <p className="green">
                  height:{this.props.userOrder.package.height}
                </p>
              ) : (
                <p>height:{this.props.userOrder.package.height}</p>
              )}
              {id === userOrderId ? (
                <p className="green">
                  length:{this.props.userOrder.package.length}
                </p>
              ) : (
                <p>length:{this.props.userOrder.package.length}</p>
              )}
            </td>

            <td>
              {" "}
              {id === userOrderId ? (
                <span className="green">
                  {" "}
                  {this.props.userOrder.sender_details.name}
                </span>
              ) : (
                this.props.userOrder.sender_details.name
              )}
            </td>
            <td>
              {" "}
              {id === userOrderId ? (
                <span className="green">
                  {" "}
                  {this.props.userOrder.recipient_details.name}
                </span>
              ) : (
                this.props.userOrder.recipient_details.name
              )}
            </td>
            {/* {id === userOrderId ? (
                <span className="green"> {status}</span>
              ) : (
                status
              )} */}
            <td>
              {status === "PROVIDED" ? (
                <span className="lightgreen">{status}</span>
              ) : (
                status
              )}
            </td>
            <td>
              {this.props.userOrder.courier === null ? (
                <span style={{ color: "red" }}> courier expired</span>
              ) : (
                this.props.userOrder.courier.user.name
              )}
            </td>
            <td>
              <NavLink
                to={{
                  pathname: "/user-order/show",
                  id: id,
                }}
              >
                show
              </NavLink>
              <br></br>
              <NavLink
                to={{
                  pathname: "/user-order/edit",
                  id: id,
                }}
              >
                edit
              </NavLink>
            </td>
          </tr>
        </tbody>
      </>
    );
  }
}

export default UserList;
