import React from "react";
import PropTypes from "prop-types";
import warrior from "../img/warrior.png";

export const You = (props) => {
  const { userName, yourHealth } = props,
    buttons = [];
  for (let i = 1; i <= 5; i++) {
    buttons.push(
      <button id="btn1" className={"btn-sm m-1 " + (i === 1 ? "btn-primary" : "btn btn-secondary")}>
        Level {i}
      </button>
    );
  }
  return (
    <div className="you">
      <div className="yourInfo">
        {userName}
        <br />
        <div id="yourStatus"></div>
        <span>{yourHealth}/100</span>
        <div className="yourHealth">
          <div className="yourHealthBar"></div>
        </div>
      </div>
      <img src={warrior} className="youImage" alt="warrior" />
    </div>
  );
};

You.propTypes = {
  userName: PropTypes.string,
  yourHealth: PropTypes.number.isRequired,
};
