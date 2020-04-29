import React from "react";
import PropTypes from "prop-types";

export const Header = (props) => {
  const { userName, record, funds } = props,
    buttons = [];
  for (let i = 1; i <= 5; i++) {
    buttons.push(
      <button id={"btn" + i} className={"btn-sm m-1 btn btn-secondary"}>
        Level {i}
      </button>
    );
  }
  return (
    <div className="header">
      <div className="record">
        Name: {userName}
        <br />
        Wins: {record.Wins}
        <br />
        Losses: {record.Losses}
      </div>
      <span className="funds">Funds: ${funds}</span>
      <div className="levels">{buttons}</div>
    </div>
  );
};

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
};
