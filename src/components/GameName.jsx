import React, { Component } from "react";
import PropTypes from "prop-types";
import { InventoryItem } from "./InventoryItem.jsx";
import { You } from "./You.jsx";
import landmark from "../img/landmark.jpg";

const fieldStyle = {
  backgroundImage: `url(${landmark})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
export class GameName extends Component {
  handleGiveUp = () => {
    if (window.confirm("Are you sure you want to give up?")) {
      this.props.onGiveUp("giveUp");
    }
  };
  render() {
    const { items, onTurn, yourHealth, userName } = this.props;
    return (
      <React.Fragment>
        <h1 className="gameName">Dragon Slayer</h1>
        <button onClick={this.handleGiveUp} className="btn btn-danger btn-sm giveUp">
          Give up
        </button>
        <div className="inventoryAndField">
          <div className="inventory">
            <h1>Inventory</h1>
            {items.map((item) => {
              return item.count > 0 ? <InventoryItem key={item.id} onTurn={onTurn} item={item} /> : null;
            })}
          </div>
          <div className="playingField" style={fieldStyle}>
            <div id="foe"></div>
            <div id="yourItem"></div>
            <div id="theirItem"></div>
            <You yourHealth={yourHealth} userName={userName} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

GameName.propTypes = {
  item: PropTypes.object.isRequired,
  foes: PropTypes.array.isRequired,
  onTurn: PropTypes.func.isRequired,
  onGiveUp: PropTypes.func.isRequired,
  yourHealth: PropTypes.number.isRequired,
};
