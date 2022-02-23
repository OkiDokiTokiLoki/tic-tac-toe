"use strict";

const player = (sign) => {
  this.sign = sign;

  const playerSign = () => {
    return sign;
  };

  return { playerSign };
};

const gameBoard = (() => {
  const _board = ['', '', '', '', '', '', '', '', ''];

  const getBoardIndex = (index) => {
    return _board[index];
  };

  const setPlayerSign = (index, sign) => {
    _board[index] = sign;
  };

  const reset = () => {
    for (let i = 0; i < _board.length; i++){
      _board[i] = '';
    };
  };

  return { getBoardIndex, setPlayerSign, reset };
})();

const displayController = (() => {

  const _gridCells = document.querySelectorAll('.cell');
  const _restartButton = document.querySelector('#restart');
  const _popup = document.querySelector('#popup');

  _gridCells.forEach((cell) => 
    cell.addEventListener('click', (e) => {
      if (gameController.gameOver() || e.target.textContent !== '') return;
      gameController.playRound(parseInt(e.target.dataset.index)); // sets the completedMoveIndex
      updateGameBoard();
    })
  );

  const updateGameBoard = () => {
    for (let i = 0; i < _gridCells.length; i++){
      _gridCells[i].textContent = gameBoard.getBoardIndex(i);
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
    _popup.textContent = message;
  }

  _restartButton.addEventListener('click', (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setMessage(`x's turn`);
  });

  return { setResultMessage, setMessage };

})();

const gameController = (() => {

  const _playerX = player('x');
  const _playerO = player('o');
  const _popupModal = document.querySelector('#popupModal');

  let _round = 1;
  let _gameIsOver = false;

  const playRound = (completedMoveIndex) => {
    
    gameBoard.setPlayerSign(completedMoveIndex, currentPlayer());
    
    if (winCheck(completedMoveIndex)) {
      _popupModal.classList.add('show');
      displayController.setResultMessage(currentPlayer());
      _gameIsOver = true;
      return;
    }

    // game is a draw
    if (_round === 9){
      _popupModal.classList.add('show');
      displayController.setResultMessage('draw');
      _gameIsOver = true;
      return;
    }

    _round++;
  };

  const currentPlayer = () => {
    return _round % 2 === 1 ? _playerX.playerSign() : _playerO.playerSign();
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
    return _gameIsOver;
  };

  const reset = () => {
    _popupModal.classList.remove('show');
    _round = 1;
    _gameIsOver = false;
  };

  return { playRound, gameOver, reset };
})();