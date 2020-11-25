import React from "react";

const UserOrderListHeader = () => {
  return (
    <thead className="thead-dark">
      <tr>
        <th>Id</th>
        <th>Number</th>
        <th>Description</th>
        <th>Comments</th>
        <th>Headquarters</th>
        <th>Package </th>
        <th>SenderDetails</th>
        <th>RecipientDetails</th>
        <th>Status</th>
        <th>Courier</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default UserOrderListHeader;
