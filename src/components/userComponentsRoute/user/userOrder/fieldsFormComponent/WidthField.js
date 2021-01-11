import React, { Component } from "react";

class WidthField extends Component {
  render() {
    const { width, handleChangePackage } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Width:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="number"
            id="width"
            name="width"
            value={width}
            onChange={handleChangePackage}
            placeholder="Width"
          />
        </div>
      </div>
    );
  }
}

export default WidthField;
