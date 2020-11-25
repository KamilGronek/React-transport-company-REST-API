// import React, { Component } from "react";
// import CourierOrderHeader from "../courierOrder/CourierOrderHeader";
// import { NavLink } from "react-router-dom";

// class CurrentCourierOrder extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       courierOrders: [],
//     };
//   }

//   componentDidMount() {
//     fetch("http://localhost:8000/api/courier-order/", {
//       method: "get",
//       headers: new Headers({
//         Authorization: "Bearer " + this.props.accessToken,
//         "Content-Type": "application/json",
//       }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response;
//         }
//         throw Error(response.status);
//       })
//       .then((response) => response.json())
//       .then((currentCourierOrders) => {
//         this.setState({
//           currentCourierOrders: currentCourierOrders,
//         });
//       })
//       .catch((error) => console.log(error));
//   }

//   render() {
//     const {
//       id,
//       // number,
//       // description,
//       // comments,
//     } = this.state.currentCourierOrders;
//     return (
//       <>
//         <div className="container">
//           <div className="text-center">
//             <h1 className="display-4">Courier order list</h1>
//           </div>
//           <table
//             className="table table-striped table-hover table-sm table-responsive-sm"
//             style={{ marginTop: 30 }}
//           >
//             <CourierOrderHeader />
//             <tbody>
//               <tr>
//                 <td>{id}</td>
//                 {/* <td>{number}</td>
//                 <td>{description}</td>
//                 <td>{comments}</td> */}
//                 {/* <td>{this.state.currentCourierOrders.headquarters.name}</td> */}

//                 {/* <td>
//                   {" "}
//                   weigth: {this.state.currentCourierOrders.package.weight}

//                   width:{this.state.currentCourierOrders.package.width}

//                   height:{this.state.currentCourierOrders.package.height}

//                   length: {this.state.currentCourierOrders.package.length}
//                 </td>

//                 <td>{this.state.currentCourierOrders.sender_details.name}</td>
//                 <td>
//                   {this.state.currentCourierOrders.recipient_details.name}
//                 </td>
//                 <td>{this.state.currentCourierOrders.status}</td>
//                 <td>{this.state.currentCourierOrders.courier.user.name}</td> */}
//                 <td>
//                   <NavLink
//                     to={{
//                       pathname: "/user/user-order/status",
//                       id: id,
//                     }}
//                   >
//                     manage status
//                   </NavLink>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </>
//     );
//   }
// }

// export default CurrentCourierOrder;
