import React, { Component } from "react";

class SenderHouseNrField extends Component {
  render() {
    const {
      senderDetails,
      handleSelectSenderDistrict,
      allDistrict,
    } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          District:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <select
            className="form-control"
            name="senderDetailsDistrict"
            value={senderDetails.district}
            onChange={handleSelectSenderDistrict}
          >
            {allDistrict.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SenderHouseNrField;
