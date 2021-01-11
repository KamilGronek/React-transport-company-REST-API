import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import NumberField from "./fieldsFormComponent/NumberField";
import DescriptionField from "./fieldsFormComponent/DescriptionField";
import HeadquartersField from "./fieldsFormComponent/HeadquartersField";
import CommentsField from "./fieldsFormComponent/CommentsField";
import WeightField from "./fieldsFormComponent/WeightField";
import HeightField from "./fieldsFormComponent/HeightField";
import LengthField from "./fieldsFormComponent/LengthField";
import WidthField from "./fieldsFormComponent/WidthField";
import AccordionField from "./fieldsFormComponent/AccordionField";
import SenderNameField from "./fieldsFormComponent/SenderNameField";
import SenderSurnameField from "./fieldsFormComponent/SenderSurnameField";
import SenderCityField from "./fieldsFormComponent/SenderCityField";
import SenderStreetField from "./fieldsFormComponent/SenderStreetField";
import SenderHouseNrField from "./fieldsFormComponent/SenderHouseNrField";
import SenderApartmentNrField from "./fieldsFormComponent/SenderApartmentNrField";
import SenderPhoneNrField from "./fieldsFormComponent/SenderPhoneNrField";
import SenderEmailField from "./fieldsFormComponent/SenderEmailField";
import SenderDistrictField from "./fieldsFormComponent/SenderDistrictField";
import RecipientNameField from "./fieldsFormComponent/RecipientNameField";
import RecipientSurnameField from "./fieldsFormComponent/RecipientSurnameField";
import RecipientCityField from "./fieldsFormComponent/RecipientCityField";
import RecipientStreetField from "./fieldsFormComponent/RecipientStreetField";
import RecipientHouseNrField from "./fieldsFormComponent/RecipientHouseNrField";
import RecipientApartmentNrField from "./fieldsFormComponent/RecipientApartmentNrField";
import RecipientPhoneNrField from "./fieldsFormComponent/RecipientPhoneNrField";
import RecipientEmailField from "./fieldsFormComponent/RecipientEmailField";
import RecipientDistrictField from "./fieldsFormComponent/RecipientDistrictField";
class UserOrderNewPiece extends Component {
  render() {
    const {
      handleChangeBase,
      handleChangeHeadquarters,
      allHeadquarters,
      handleChangePackage,
      hrLine,
      handleSwitchArrow,
      changeArrow,
      handleChangeSenderDetails,
      handleSelectSenderDistrict,
      handleChangeRecipientDetails,
      allDistrict,
      handleSelectRecipientDistrict,
    } = this.props;

    return (
      <>
        <div className="row justify-content-center ">
          <div className=" col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
            <br />
            <strong>Details:</strong>
            <NumberField handleChangeBase={handleChangeBase} />
            <DescriptionField handleChangeBase={handleChangeBase} />
            <HeadquartersField
              handleChangeHeadquarters={handleChangeHeadquarters}
              allHeadquarters={allHeadquarters}
            />
            <CommentsField handleChangeBase={handleChangeBase} />
          </div>

          <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
            <br />
            <strong>Package:</strong>
            <WeightField handleChangePackage={handleChangePackage} />
            <HeightField handleChangePackage={handleChangePackage} />
            <LengthField handleChangePackage={handleChangePackage} />
            <WidthField handleChangePackage={handleChangePackage} />
          </div>
        </div>
        {hrLine && (
          <div className="col-2 offset-5">
            <div className="col-4 offset-4">
              <hr className="hr" />
            </div>
          </div>
        )}
        <div id="accordion">
          <div>
            <AccordionField
              handleSwitchArrow={handleSwitchArrow}
              changeArrow={changeArrow}
            />
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div className="row justify-content-center" id="continuedOrder">
                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
                  <br />
                  <strong>Sender details:</strong>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      Name:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChangeSenderDetails}
                        placeholder="Name"
                      />
                    </div>
                  </div>
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
                        onChange={handleChangeSenderDetails}
                        placeholder="Surname"
                      />
                    </div>
                  </div>
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
                        onChange={handleChangeSenderDetails}
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      Street:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="street"
                        name="street"
                        onChange={handleChangeSenderDetails}
                        placeholder="Street"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      House number:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="houseNumber"
                        name="houseNumber"
                        onChange={handleChangeSenderDetails}
                        placeholder="Street"
                      />
                    </div>
                  </div>
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
                        onChange={handleChangeSenderDetails}
                        placeholder="Street"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      Phone number:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={handleChangeSenderDetails}
                        placeholder="Street"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      E-mail:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChangeSenderDetails}
                        placeholder="Street"
                      />
                    </div>
                  </div>
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
                        name="senderDetailsDistrict"
                        onChange={handleSelectSenderDistrict}
                      >
                        {allDistrict.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
                  <br />
                  <strong>Recipient details:</strong>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      Name:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChangeRecipientDetails}
                        placeholder="Name"
                      />
                    </div>
                  </div>
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
                        onChange={handleChangeRecipientDetails}
                        placeholder="Surname"
                      />
                    </div>
                  </div>
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
                        onChange={handleChangeRecipientDetails}
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      Street:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="street"
                        name="street"
                        onChange={handleChangeRecipientDetails}
                        placeholder="Street"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      House number:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="houseNumber"
                        name="houseNumber"
                        onChange={handleChangeRecipientDetails}
                        placeholder="House number"
                      />
                    </div>
                  </div>
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
                        onChange={handleChangeRecipientDetails}
                        placeholder="Apartment number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      Phone number:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={handleChangeRecipientDetails}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className=" col-xl-5 col-lg-4 col-sm-3 col-form-label"
                    >
                      E-mail:
                    </label>
                    <div className="col-xl-7 col-lg-8 col-sm-9 col-12">
                      <input
                        className="form-control"
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChangeRecipientDetails}
                        placeholder="E-mail"
                      />
                    </div>
                  </div>
                  <RecipientDistrictField
                    handleSelectRecipientDistrict={
                      handleSelectRecipientDistrict
                    }
                    allDistrict={allDistrict}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-success btn-circle btn-lg" type="submit">
            CREATE
          </button>
        </div>
        <div className="d-flex flex-column">
          <NavLink to="/user-order" style={{ textAlign: "center" }}>
            back to list
          </NavLink>
          <NavLink to="" style={{ textAlign: "center" }}>
            logout
          </NavLink>
        </div>
        <br />
      </>
    );
  }
}

export default UserOrderNewPiece;
