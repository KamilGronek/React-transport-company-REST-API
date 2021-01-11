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

class UserOrderEditForm extends Component {
  render() {
    const {
      handleSubmit,
      handleChangeBase,
      handleChangeHeadquarters,
      allHeadquarters,
      headquarters,
      handleChangePackage,
      handleChangeSenderDetails,
      handleSelectSenderDistrict,
      handleChangeRecipientDetails,
      handleSelectRecipientDistrict,
      number,
      description,
      comments,
      senderDetails,
      recipientDetails,
      changeArrow,
      weight,
      height,
      length,
      width,
      handleSwitchArrow,
      hrLine,
      allDistrict,
      district,
    } = this.props;

    return (
      <>
        <h1
          className="m-2 display-4 d-flex justify-content-center"
          style={{ fontSize: "40px", paddingTop: "100px" }}
        >
          Edit order user
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center ">
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
              <br />
              <strong>Details:</strong>
              <NumberField
                numberValue={number}
                handleChangeBase={handleChangeBase}
              />
              <DescriptionField
                descriptionValue={description}
                handleChangeBase={handleChangeBase}
              />
              <HeadquartersField
                handleChangeHeadquarters={handleChangeHeadquarters}
                headquartersValue={headquarters}
                allHeadquarters={allHeadquarters}
              />
              <CommentsField
                comments={comments}
                handleChangeBase={handleChangeBase}
              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
              <br />
              <strong>Package:</strong>
              <WeightField
                weight={weight}
                handleChangePackage={handleChangePackage}
              />
              <HeightField
                height={height}
                handleChangePackage={handleChangePackage}
              />
              <LengthField
                length={length}
                handleChangePackage={handleChangePackage}
              />
              <WidthField
                width={width}
                handleChangePackage={handleChangePackage}
              />
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

                    <SenderNameField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderSurnameField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderCityField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderStreetField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderHouseNrField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderApartmentNrField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderPhoneNrField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderEmailField
                      senderDetails={senderDetails}
                      handleChangeSenderDetails={handleChangeSenderDetails}
                    />
                    <SenderDistrictField
                      senderDetails={senderDetails}
                      handleSelectSenderDistrict={handleSelectSenderDistrict}
                      allDistrict={allDistrict}
                    />
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-8  m-2 border bg-light ">
                    <br />
                    <strong>Recipient details:</strong>
                    <RecipientNameField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientSurnameField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientCityField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientStreetField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientHouseNrField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientApartmentNrField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientPhoneNrField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientEmailField
                      recipientDetails={recipientDetails}
                      handleChangeRecipientDetails={
                        handleChangeRecipientDetails
                      }
                    />
                    <RecipientDistrictField
                      district={district}
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
            <button
              className="btn btn-warning  btn-circle btn-lg"
              type="submit"
            >
              EDIT
            </button>
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/user-order" style={{ textAlign: "center" }}>
              back to list
            </NavLink>
            <NavLink to="/login" style={{ textAlign: "center" }}>
              logout
            </NavLink>
          </div>
          <br />
        </form>
      </>
    );
  }
}

export default UserOrderEditForm;
