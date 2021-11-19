import React from "react";
import PropTypes from "prop-types";

export const GameOver = (props) => {
  const { onPlayAgain } = props;
  return (
    <div className="gameOver">
      <span id="gameOverText"></span>
      <br />
      <br />
      <button onClick={onPlayAgain} className="btn btn-primary btn-sm m-1">
        Play Again
      </button>
    </div>
  );
};

GameOver.propTypes = {
  onPlayAgain: PropTypes.func.isRequired,
};
