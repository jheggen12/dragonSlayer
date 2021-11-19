import React, { Component } from "react";
import PropTypes from "prop-types";
import { StoreItem } from "./StoreItem.jsx";

export class Store extends Component {
  render() {
    const { items, currentFoe, funds, onIncrement, onDecrement, onZero, onReset, onPlay, userName, onNameChange } = this.props;
    let storeButtons = (
      <React.Fragment>
        <button onClick={onPlay} className="playButton btn m-2">
          {currentFoe === 0 ? "Play game!" : "Back to game!"}
        </button>
        {currentFoe === 0 ? (
          <button onClick={onReset} className="btn btn-danger m-2">
            Reset purchases
          </button>
        ) : (
          ""
        )}
      </React.Fragment>
    );
    let instructions = (
      <p className="instructions">
        Make some purchases! <br /> Stock up on supplies for the game!
      </p>
    );
    return (
      <div id="store">
        <div className="nameFighter">
          Name your fighter: <input maxLength="12" onChange={onNameChange} value={userName} type="text" />
        </div>
        <h1 className="storeLabel">Store</h1>
        {funds === 100 ? instructions : storeButtons}
        <br />

        <div className="itemList">
          {items.map((item) => (
            <StoreItem key={item.id} onIncrement={onIncrement} onDecrement={onDecrement} onZero={onZero} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

Store.propTypes = {
  items: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onZero: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
};
