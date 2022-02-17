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

const displayController = (() => {

  const gridCells = document.querySelectorAll('.cell');
  const restartButton = document.querySelectorAll('#restart');
  const popupModal = document.querySelector('#popup');

  gridCells.forEach((cell) => 
    cell.addEventListener('click', (e) => {
      if (gameController.gameOver() || e.target.textContent !== '') return;
      gameController.playRound(parseInt(e.target.dataset.index));
    updateGameBoard();
    })
  );

  const updateGameBoard = () => {
    for (let i = 0; i < gridCells.length; i++){
      gridCells[i].textContent = gameBoard.getBoardIndex(i);
    }
  };

  const setResultMessage = (winner) => {
    if (winner === 'draw'){
      setMessage(`it's a draw`);
    } else {
      setMessage(`${winner} has won`);
    }
  };

  const setMessage = (message) => {
    popupModal.textContent = message;
  }

  restartButton.forEach((button) => 
    button. addEventListener('click', (e) => {
      gameBoard.reset();
      gameController.reset();
      updateGameBoard();
      setMessage(`x's turn`);
    })
  );

  return { setResultMessage, setMessage };

})();

const gameController = (() => {

  const playerX = player('x');
  const playerO = player('o');
  const popupContainer = document.querySelector('#popupContainer');

  let round = 1;
  let gameIsOver = false;

  const playRound = (completedMoveIndex) => {
    
    gameBoard.setPlayerSign(completedMoveIndex, currentPlayer());
    
    if (winCheck(completedMoveIndex)) {
      popupContainer.classList.add('show');
      displayController.setResultMessage(currentPlayer());
      gameIsOver = true;
      return;
    }

    // game is a draw
    if (round === 9){
      popupContainer.classList.add('show');
      displayController.setResultMessage('draw');
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
    popupContainer.classList.remove('show');
    round = 1;
    gameIsOver = false;
  };

  return { playRound, gameOver, reset };
})();