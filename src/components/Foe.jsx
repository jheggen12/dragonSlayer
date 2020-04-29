import React from "react";
import PropTypes from "prop-types";

export class Foe extends React.Component {
  render() {
    const { foe } = this.props;
    const foeId = `foe${foe.id}`;
    const statusId = `theirStatus${foe.id}`;
    return (
      <div id={foeId} className="foe">
        <img src={foe.picture} className="foeImage" alt={foe.name} />
        <div className="theirInfo">
          {foe.name}
          <br />
          <span>
            {foe.health}/{foe.maxHealth}
          </span>
          <div className="theirHealth">
            <div className="theirHealthBar"></div>
          </div>
          <div id={statusId} className="theirStatus"></div>
        </div>
      </div>
    );
  }
}

Foe.propTypes = {
  foe: PropTypes.object.isRequired,
};
