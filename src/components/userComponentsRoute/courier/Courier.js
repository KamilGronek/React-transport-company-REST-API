import React, { useEffect, useReducer } from "react";
import CourierListHeader from "../../CourierListHeader";
import CourierList from "./CourierList";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";
import ModulAPI from "../../../api/ModulAPI";
import { initialCourierrListState } from "../../../../src/InitialState";

const stateReducer = (prevState, stateChanges) => {
  return {
    ...prevState,
    ...stateChanges,
  };
};

function Courier(props) {
  const [state, setState] = useReducer(stateReducer, initialCourierrListState);

  useEffect(() => {
    ModulAPI.get(props.accessToken, "courier", "get").then((couriers) => {
      couriers.reverse();
      setState({
        couriers: couriers,
      });
    });
    scrollToBottom();
  }, []);

  const setActiveUserId = () => {
    if (state.active) {
      return "";
    } else {
      if (props.history.location.active) {
        return props.history.location.state.courierNewId;
      } else {
        return "";
      }
    }
  };

  // const setEditCourierId = () => {
  //   if (state.activeEdit) {
  //     return "";
  //   } else {
  //     if (props.history.location.activeEdit) {
  //       return props.history.location.state.courierEdit;
  //     } else {
  //       return "";
  //     }
  //   }
  // };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "ContainerElementID",
    });
  };

  const handleIncrementCount = () => {
    setState({
      count: state.count + 1,
      showLessButton: false,
    });

    scrollToBottom();
    showLessButton();
  };

  const handleDecrementCount = () => {
    setState({
      count: state.count - 1,
    });
  };

  const showLessButton = () => {
    setState({
      showLessButton: true,
    });
  };

  const getOrders = () => {
    let couriers = [...state.couriers];
    let n = 3;
    let increment = state.count;
    let decrement = state.count;

    let arrayLength = couriers.slice(0, n * increment || decrement);
    console.log(arrayLength.length);
    return arrayLength.map((courier) => (
      <CourierList
        key={courier.id}
        courier={courier}
        courierNewId={setActiveUserId()}
        // courierEditId={setEditCourierId()}
      />
    ));
  };

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="display-4">Courier list</h1>
        </div>
        <table className="table table-striped table-hover table-sm table-responsive-sm">
          <CourierListHeader />
          {getOrders()}
        </table>
        <div className="col-2 offset-5">
          <div className="col-8 offset-2">
            <hr className="hr" style={{ marginTop: "10px" }} />
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className=" row justify-content-center">
            <h5 className="mb-0 ">
              <Link
                to="#"
                className="btn btn-link collapsed"
                style={{ fontSize: "11px" }}
                type="button"
                onClick={handleIncrementCount}
              >
                Show more <span style={{ visibility: "hidden" }}>xx</span>
                <i className="arrow down"></i>
              </Link>
            </h5>
          </div>
          <div className=" row justify-content-center">
            <h5 className="mb-0 ">
              {state.count > 1 ? (
                <>
                  <Link
                    to="#"
                    className={
                      state.showLessButton
                        ? "visible btn btn-link collapsed"
                        : "hidden btn btn-link collapsed"
                    }
                    style={{ fontSize: "11px" }}
                    type="button"
                    onClick={handleDecrementCount}
                  >
                    Show less
                    <span style={{ visibility: "hidden" }}>xxxx</span>
                    <i className="arrow up"></i>
                  </Link>
                </>
              ) : (
                ""
              )}
            </h5>
          </div>
          <div className="text-center ">
            <NavLink
              style={{
                paddingTop: "15px",
              }}
              className="btn btn-success btn-circle btn-lg"
              to="/courier/new"
            >
              CREATE{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courier;
