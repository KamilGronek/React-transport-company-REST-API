import React, { Component } from "react";

class DescriptionField extends Component {
  render() {
    const { descriptionValue, handleChangeBase } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Description:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="text"
            id="description"
            name="description"
            value={descriptionValue}
            onChange={handleChangeBase}
            placeholder="Description"
          />
        </div>
      </div>
    );
  }
}

export default DescriptionField;
