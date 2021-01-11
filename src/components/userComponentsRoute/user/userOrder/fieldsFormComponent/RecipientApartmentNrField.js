import React, { Component } from "react";

class RecipientApartmentNrField extends Component {
  render() {
    const { recipientDetails, handleChangeRecipientDetails } = this.props;

    return (
      <div className="form-group row">
        <label
          htmlFor="name"
          className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
        >
          Apartment number:
        </label>
        <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
          <input
            className="form-control"
            type="text"
            id="apartmentNumber"
            name="apartmentNumber"
            value={recipientDetails.apartmentNumber}
            onChange={handleChangeRecipientDetails}
            placeholder="Apartment number"
          />
        </div>
      </div>
    );
  }
}

export default RecipientApartmentNrField;
