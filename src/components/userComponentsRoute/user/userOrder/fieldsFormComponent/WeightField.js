import React, { Component } from "react";

class WeightField extends Component {
  render() {
    const { weight, handleChangePackage } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Weight:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={handleChangePackage}
            placeholder="Weight"
          />
        </div>
      </div>
    );
  }
}

export default WeightField;
