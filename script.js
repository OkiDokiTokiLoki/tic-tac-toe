"use strict";

const player = (sign) => {
  this.sign = sign;

  const playerSign = () => {
    return sign;
  };

  return { playerSign };
};

const gameBoard = (() => {

  const board = ['', '', '', '', '', '', '', '', ''];

  const setPlayerSign = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++){
      board[i] = '';
    };
  };

  return { setPlayerSign, reset };
})();