import React, { useReducer, useEffect } from "react";
import UserOrderNewForm from "./UserOrderNewForm";
// import { NavLink } from "react-router-dom";
// import { Link } from "react-scroll";
// import UserOrderNewPiece from "./fieldsFormComponent/UserOrderNewPiece";
import ModulAPI from "../../../../api/ModulAPI";
import { initialUserOrderState } from "../../../../InitialState";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function UserOrderNew(props) {
  const [state, setState] = useReducer(stateReducer, initialUserOrderState);

  const handleSwitchArrow = () => {
    setState({
      changeArrow: !state.changeArrow,
      hrLine: !state.hrLine,
    });
  };

  const handleChangeBase = (e) => {
    // console.log(state);
    const value = e.target.value;
    const name = e.target.name;
    let userOrder = state.userOrder;
    userOrder[name] = value;
    setState({
      userOrder,
    });
  };

  const handleChangePackage = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let packageValue = state.userOrder.package;
    packageValue[name] = value;
    setState({
      packageValue,
    });
  };

  const handleChangeSenderDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let senderDetails = state.userOrder.senderDetails;
    senderDetails[name] = value;
    setState({
      senderDetails,
    });
  };

  const handleChangeRecipientDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let recipientDetails = state.userOrder.recipientDetails;
    recipientDetails[name] = value;
    setState({
      recipientDetails,
    });
  };
  //---------------------------------------------------------

  const handleChangeHeadquarters = (e) => {
    const value = e.target.value;
    let userOrder = state.userOrder;
    userOrder.headquarters = value;
    setState({
      userOrder,
    });
  };

  const handleSelectSenderDistrict = (e) => {
    const value = e.target.value;
    let userOrder = state.userOrder;
    userOrder.senderDetails.district = value;
    setState({
      userOrder,
    });
  };

  const handleSelectRecipientDistrict = (e) => {
    const value = e.target.value;
    let userOrder = state.userOrder;
    userOrder.recipientDetails.district = value;
    setState({
      userOrder,
    });
  };

  const fetchHeadquarters = () => {
    ModulAPI.get(props.accessToken, "headquarters", "get")
      .then((allHeadquarters) => {
        setState({
          allHeadquarters: allHeadquarters,
        });
      })
      .catch((error) => console.log(error));
  };

  const fetchDistricts = () => {
    ModulAPI.get(props.accessToken, "district", "get")
      .then((allDistrict) => {
        setState({
          allDistrict: allDistrict,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchHeadquarters();
    fetchDistricts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(state.userOrder);
    ModulAPI.post(props.accessToken, "user-order/new", "post", json)
      .then((userOrder) => {
        props.history.push({
          pathname: "/user-order",
          state: { userOrderId: userOrder.id },
          active: true,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <UserOrderNewForm
      handleSubmit={handleSubmit}
      handleChangeBase={handleChangeBase}
      handleChangeHeadquarters={handleChangeHeadquarters}
      allHeadquarters={state.allHeadquarters}
      handleChangePackage={handleChangePackage}
      hrLine={state.hrLine}
      handleSwitchArrow={handleSwitchArrow}
      changeArrow={state.changeArrow}
      handleChangeSenderDetails={handleChangeSenderDetails}
      handleSelectSenderDistrict={handleSelectSenderDistrict}
      handleChangeRecipientDetails={handleChangeRecipientDetails}
      allDistrict={state.allDistrict}
      handleSelectRecipientDistrict={handleSelectRecipientDistrict}
    />
  );
}

export default UserOrderNew;
