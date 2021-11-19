import React, { Component } from "react";
import PropTypes from "prop-types";

export class BonusItem extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { bonusItemId, items, onBonusChoice } = this.props;
    const cashValue = Math.floor(Math.random() * 10) + 5; //cash value between 5-15
    let bonus;
    if (Math.random() < 0.5) {
      bonus = (
        <div id={`bonusItem${bonusItemId}`} className="bonusItem" onClick={() => onBonusChoice("cash", cashValue, bonusItemId)}>
          <div className="shownValue">???</div>
          <div className="hiddenValue">${cashValue}</div>
        </div>
      );
    } else {
      const itemId = Math.floor(Math.random() * 9),
        item = items[itemId],
        itemValue = Math.floor(cashValue / item.cost) > 0 ? Math.floor(cashValue / item.cost) : 1,
        itemName = item.name;
      bonus = (
        <div id={`bonusItem${bonusItemId}`} className="bonusItem" onClick={() => onBonusChoice("item", itemValue, bonusItemId, itemName)}>
          <div className="shownValue">???</div>
          <div className="hiddenValue">
            {itemValue}x <img id={itemId} src={item.picture} className="image" height="40px" width="40px" alt={item.name} />
          </div>
        </div>
      );
    }
    return bonus;
  }
}

BonusItem.propTypes = {};
