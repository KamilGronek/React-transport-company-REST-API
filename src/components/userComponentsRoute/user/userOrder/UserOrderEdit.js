import React, { useReducer, useEffect } from "react";
import ModulAPI from "../../../../api/ModulAPI";
import UserOrderEditForm from "./UserOrderEditForm";
import { initialUserOrderState } from "../../../../InitialState";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function UserOrderEdit(props) {
  const [state, setState] = useReducer(stateReducer, initialUserOrderState);

  const handleSwitchArrow = () => {
    setState({
      changeArrow: !state.changeArrow,
      hrLine: !state.hrLine,
    });
  };

  const handleChangeBase = (e) => {
    console.log(state);
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
    ModulAPI.get(props.accessToken, "headquarters", "get").then(
      (allHeadquarters) => {
        setState({
          allHeadquarters: allHeadquarters,
        });
      }
    );
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

  const getUserOrderEditValues = () => {
    // problem z   headquarters: response.headquarters.id,
    fetch("http://localhost:8000/api/user-order/" + props.location.id, {
      //read
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + props.accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((response) => {
        setState({
          userOrder: {
            number: response.number,
            description: response.description,
            comments: response.comments,
            headquarters: response.headquarters.id,
            package: {
              weight: response.package.weight,
              width: response.package.width,
              height: response.package.height,
              length: response.package.length,
            },
            senderDetails: {
              name: response.sender_details.name,
              surname: response.sender_details.surname,
              city: response.sender_details.city,
              street: response.sender_details.street,
              houseNumber: response.sender_details.house_number,
              apartmentNumber: response.sender_details.apartment_number,
              email: response.sender_details.email,
              district: response.sender_details.district.id,
              phoneNumber: response.sender_details.phone_number,
            },
            recipientDetails: {
              name: response.recipient_details.name,
              surname: response.recipient_details.surname,
              city: response.recipient_details.city,
              street: response.recipient_details.street,
              houseNumber: response.recipient_details.house_number,
              apartmentNumber: response.recipient_details.apartment_number,
              email: response.recipient_details.email,
              district: response.recipient_details.district.id,
              phoneNumber: response.recipient_details.phone_number,
            },
          },
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchHeadquarters();
    fetchDistricts();
    getUserOrderEditValues();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let json = JSON.stringify(state.userOrder);
    ModulAPI.put(
      props.accessToken,
      "user-order",
      "put",
      props.location.id,
      json,
      "/edit/user"
    ).then((response) => {
      props.history.push({
        pathname: "/user-order",
        state: { userOrderEditId: props.location.id },
        activeEdit: true,
      });
      return response;
    });
  };

  return (
    <UserOrderEditForm
      handleSubmit={handleSubmit}
      handleChangeBase={handleChangeBase}
      handleChangeHeadquarters={handleChangeHeadquarters}
      allHeadquarters={state.allHeadquarters}
      headquarters={state.userOrder.headquarters}
      handleChangePackage={handleChangePackage}
      handleChangeSenderDetails={handleChangeSenderDetails}
      handleSelectSenderDistrict={handleSelectSenderDistrict}
      handleChangeRecipientDetails={handleChangeRecipientDetails}
      handleSelectRecipientDistrict={handleSelectRecipientDistrict}
      number={state.userOrder.number}
      description={state.userOrder.description}
      comments={state.userOrder.comments}
      senderDetails={state.userOrder.senderDetails}
      recipientDetails={state.userOrder.recipientDetails}
      changeArrow={state.changeArrow}
      weight={state.userOrder.package.weight}
      height={state.userOrder.package.height}
      length={state.userOrder.package.length}
      width={state.userOrder.package.width}
      handleSwitchArrow={handleSwitchArrow}
      hrLine={state.hrLine}
      allDistrict={state.allDistrict}
      district={state.userOrder.recipientDetails.district}
    />
  );
}

export default UserOrderEdit;
