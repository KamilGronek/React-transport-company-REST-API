import React, { Component } from "react";
import User from "./userComponentsRoute/user/User";
import UserNew from "./userComponentsRoute/user/UserNew";
import UserEdit from "./userComponentsRoute/user/UserEdit";

import UserListShow from "./userComponentsRoute/user/UserListShow";
import UserOrder from "./userComponentsRoute/user/userOrder/UserOrder";
import UserOrderNew from "./userComponentsRoute/user/userOrder/UserOrderNew";
import UserOrderListShow from "./userComponentsRoute/user/userOrder/UserOrderListShow";
// import UserListEdit from "./userComponentsRoute/user/UserListEdit";
import UserOrderEdit from "./userComponentsRoute/user/userOrder/UserOrderEdit";

import Courier from "./userComponentsRoute/courier/Courier";
import CourierNew from "./userComponentsRoute/courier/CourierNew";
import CourierListShow from "./userComponentsRoute/courier/CourierListShow";
import CourierEdit from "./userComponentsRoute/courier/CourierEdit";

import CourierOrder from "./userComponentsRoute/courier/courierOrder/CourierOrder";
// import CurrentCourierOrder from "./userComponentsRoute/courier/currentCourierOrder.js/CurrentCourierOrder";
// import LoginForm from "./LoginForm";
import { Route } from "react-router-dom";
import UserOrderStatusChange from "./UserOrderStatusChange";

class UserComponents extends Component {
  render() {
    return (
      <>
        <Route path="/user/" exact render={() => <User {...this.props} />} />

        <Route
          path="/user/new"
          exact
          render={() => <UserNew {...this.props} />}
        />

        <Route
          path="/user/show"
          render={({ location }) => (
            <UserListShow {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/edit"
          render={({ location }) => (
            <UserEdit {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/user-order"
          exact
          render={() => <UserOrder {...this.props} />}
        />

        <Route
          path="/user/user-order/new"
          render={({ location }) => (
            <UserOrderNew {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/user-order/show"
          render={({ location }) => (
            <UserOrderListShow {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/user-order/edit"
          render={({ location }) => (
            <UserOrderEdit {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/courier"
          exact
          render={() => <Courier {...this.props} />}
        />

        <Route
          path="/user/courier/new"
          // exact
          render={() => <CourierNew {...this.props} />}
        />

        <Route
          path="/user/courier/show"
          render={({ location }) => (
            <CourierListShow {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/courier/edit"
          render={({ location }) => (
            <CourierEdit {...this.props} location={location} />
          )}
        />

        <Route
          path="/user/courier-order"
          render={() => <CourierOrder {...this.props} />}
        />

        {/* <Route
          path="/user/currentCourier"
          render={({ location }) => (
            <CurrentCourierOrder {...this.props} location={location} />
          )}
        /> */}

        <Route
          path="/user/user-order/status"
          render={({ location }) => (
            <UserOrderStatusChange {...this.props} location={location} />
          )}
        />
      </>
    );
  }
}

export default UserComponents;
