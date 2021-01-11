import React, { Component } from "react";

class SenderSurnameField extends Component {
  render() {
    const { senderDetails, handleChangeSenderDetails } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          City:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="text"
            id="city"
            name="city"
            value={senderDetails.city}
            onChange={handleChangeSenderDetails}
            placeholder="City"
          />
        </div>
      </div>
    );
  }
}

export default SenderSurnameField;
