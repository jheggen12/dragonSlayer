import React from "react";
import PropTypes from "prop-types";

export const InventoryItem = (props) => {
  const { item } = props;
  let itemId = `item${item.id}`;
  return (
    <div onClick={() => props.onTurn(item)} className="item inventoryItem" title={item.text}>
      <img id={itemId} src={item.picture} className="image" height="40px" width="40px" alt={item.name} />
      <span className="invCount auto">{item.count}</span>
      {/*<button className="btn btn-primary btn-sm m-3">Use</button>
       <span className="question">
        ?
      </span> */}
    </div>
  );
};

InventoryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
