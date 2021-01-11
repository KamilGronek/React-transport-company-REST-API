import React, { Component } from "react";

class RecipientDistrictField extends Component {
  render() {
    const { district, handleSelectRecipientDistrict, allDistrict } = this.props;

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
            name="recipientDetailsDistrict"
            value={district}
            onChange={handleSelectRecipientDistrict}
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

export default RecipientDistrictField;
