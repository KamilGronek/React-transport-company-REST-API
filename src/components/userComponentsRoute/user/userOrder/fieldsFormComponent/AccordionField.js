import React, { Component } from "react";
import { Link } from "react-scroll";

class AccordionField extends Component {
  render() {
    const { handleSwitchArrow, changeArrow } = this.props;

    return (
      <div
        style={{ paddingBottom: "10px" }}
        className=" row justify-content-center col-6 offset-3"
        id="headingThree "
      >
        <h5 className="mb-0">
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
          ></Link>
        </h5>
      </div>
    );
  }
}

export default AccordionField;
