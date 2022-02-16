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

  const getBoardIndex = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++){
      board[i] = '';
    };
  };

  return { setPlayerSign, getBoardIndex, reset };
})();

const gameController = (() => {

  const playerX = player('X');
  const playerO = player('O');

  let round = 1;
  let gameIsOver = false;

  const playRound = (completedMoveIndex) => {
    
    gameBoard.setPlayerSign(completedMoveIndex, currentPlayer());
    
    if (winCheck(completedMoveIndex)) {
      gameIsOver = true;
      return;
    }

    // game is a draw
    if (round === 9){
      gameIsOver = true;
      return;
    }

    round++;
  };

  const currentPlayer = () => {
    return round % 2 === 1 ? playerX.playerSign() : playerO.playerSign();
  };

  const winCheck = (completedMoveIndex) => {

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(completedMoveIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getBoardIndex(index) === currentPlayer()
        )
      );
  };

  const gameOver = () => {
    return gameIsOver;
  };

  const reset = () => {
    round = 1;
    gameIsOver = false;
  };

  return { playRound, gameOver, reset }
})();