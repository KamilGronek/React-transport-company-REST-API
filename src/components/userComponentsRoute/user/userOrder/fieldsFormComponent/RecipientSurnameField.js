import React, { Component } from "react";

class RecipientSurnameField extends Component {
  render() {
    const { recipientDetails, handleChangeRecipientDetails } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Surname:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="text"
            id="surname"
            name="surname"
            value={recipientDetails.surname}
            onChange={handleChangeRecipientDetails}
            placeholder="Surname"
          />
        </div>
      </div>
    );
  }
}

export default RecipientSurnameField;
