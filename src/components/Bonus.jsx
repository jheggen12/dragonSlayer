import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BonusItem } from "./BonusItem.jsx";
import $ from "jquery";

export class Bonus extends Component {
  backToStore = () => {
    $("#store").show();
    this.props.onBonusEnd();
  };
  continuePlaying = () => {
    $("#game").show();
    this.props.renderFoe(2, 100, true);
    this.props.onBonusEnd();
  };
  render() {
    const { items, onBonusChoice, bonusItems } = this.props;
    return (
      <React.Fragment>
        <h1 className="gameName">Bonus Round</h1>
        <br />
        <div className="bonusItems">
          {bonusItems.map((item) => {
            return <BonusItem key={item} bonusItemId={item} items={items} onBonusChoice={onBonusChoice} />;
          })}
        </div>
        <button className="btn btn-danger m-2" onClick={this.backToStore}>
          Back to Store
        </button>
        <button className="btn btn-success m-2" onClick={this.continuePlaying}>
          Continue Playing
        </button>
      </React.Fragment>
    );
  }
}

Bonus.propTypes = {
  onBonusChoice: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};
