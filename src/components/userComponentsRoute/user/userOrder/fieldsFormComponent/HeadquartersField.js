import React, { Component } from "react";

class HeadquartersField extends Component {
  render() {
    const {
      headquartersValue,
      handleChangeHeadquarters,
      allHeadquarters,
    } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Headquarters:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <select
            className="form-control"
            name="headquarters"
            value={headquartersValue}
            onChange={handleChangeHeadquarters}
          >
            {allHeadquarters.map((headquarter) => (
              <option key={headquarter.id} value={headquarter.id}>
                {headquarter.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default HeadquartersField;
