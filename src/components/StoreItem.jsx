import React from "react";
import PropTypes from "prop-types";

export const StoreItem = (props) => {
  const { item } = props;
  let zeroButton;
  if (item.count > 0) {
    zeroButton = (
      <button onClick={() => props.onZero(item)} className="btn zero btn-danger btn-sm auto block">
        Zero
      </button>
    );
  }
  return (
    <div className="item storeItem">
      <img src={item.picture} className="image" height="40px" width="40px" alt={item.name} />
      <span className="question" title={item.text}>
        ?
      </span>
      <span className="block">${item.cost}</span>
      <span className="block count auto">{item.count}</span>
      <button onClick={() => props.onIncrement(item)} className="btn plus btn-secondary btn-sm m-1">
        +
      </button>
      <button onClick={() => props.onDecrement(item)} className="btn minus btn-primary btn-sm m-1">
        -
      </button>
      {zeroButton}
    </div>
  );
};

StoreItem.propTypes = {
  item: PropTypes.object.isRequired,
};
