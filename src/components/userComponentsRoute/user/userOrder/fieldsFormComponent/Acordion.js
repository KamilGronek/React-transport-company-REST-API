import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

class HeadquartersField extends Component {
  render() {
    const {
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
        <div id="accordion">
          <div>
            <div
              style={{ paddingBottom: "10px" }}
              className=" row justify-content-center col-6 offset-3"
              id="headingThree "
            >
              <h5 className="mb-0 ">
                <Link
                  to="continuedOrder"
                  smooth={true}
                  duration={1000}
                  type="button"
                  className="btn btn-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  onClick={handleSwitchArrow}
                  style={{ fontSize: "11px" }}
                >
                  continued order
                </Link>

                <Link
                  to="continuedOrder"
                  smooth={true}
                  duration={1000}
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  className={"arrow " + (changeArrow ? "down" : "up")}
                  onClick={handleSwitchArrow}
                >
                  {" "}
                </Link>
              </h5>
            </div>

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
                        name="recipientDetailsDistrict"
                        onChange={handleSelectRecipientDistrict}
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

export default HeadquartersField;
