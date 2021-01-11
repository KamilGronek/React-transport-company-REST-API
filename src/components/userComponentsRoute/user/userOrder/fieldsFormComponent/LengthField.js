import React, { Component } from "react";

class LenghtField extends Component {
  render() {
    const { length, handleChangePackage } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Length:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="number"
            id="length"
            name="length"
            value={length}
            onChange={handleChangePackage}
            placeholder="Length"
          />
        </div>
      </div>
    );
  }
}

export default LenghtField;
