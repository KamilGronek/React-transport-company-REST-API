import React from "react";

const CourierListHeader = () => {
  return (
    <thead className="thead-dark">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Role</th>
        <th>PhoneNumber</th>
        <th>E-mail</th>
        <th>District</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default CourierListHeader;
