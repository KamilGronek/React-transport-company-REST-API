import React, { Component } from "react";

class NumberField extends Component {
  render() {
    const { numberValue, handleChangeBase } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Number:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="text"
            id="number"
            name="number"
            value={numberValue}
            onChange={handleChangeBase}
            placeholder="Number"
          />
        </div>
      </div>
    );
  }
}

export default NumberField;
