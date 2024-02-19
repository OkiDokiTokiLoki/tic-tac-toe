const player = (sign) => {
  const playerSign = () => sign;
  return { playerSign };
};

const gameBoard = (() => {
  const _board = Array(9).fill('');

  const getBoardIndex = (index) => _board[index];
  const setPlayerSign = (index, sign) => _board[index] = sign;
  const reset = () => _board.fill('');

  return { getBoardIndex, setPlayerSign, reset };
})();

const displayController = (() => {
  const _gridCells = document.querySelectorAll('.cell');
  const _restartButton = document.querySelector('#restart');
  const _popup = document.querySelector('#popup');
  const _currentPlayerTurn = document.querySelector('#currentPlayerTurn');

  const rootStyles = getComputedStyle(document.documentElement);
  const colorPink = rootStyles.getPropertyValue('--pink');
  const colorBlue = rootStyles.getPropertyValue('--blue');

  const addHoverEffect = () => {
    _gridCells.forEach((cell) => {
      cell.addEventListener('mouseover', () => {
        const currentPlayer = gameController.currentPlayer();
        cell.style.backgroundColor = currentPlayer === 'x' ? `${colorPink}` : `${colorBlue}`;
      });

      cell.addEventListener('mouseout', () => {
        cell.style.backgroundColor = '';
      });
    });
  };

  _gridCells.forEach((cell) =>
    cell.addEventListener('click', (e) => {
      if (gameController.gameOver() || e.target.textContent !== '') return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameBoard();
      updateCurrentPlayerTurn();
    })
  );

  addHoverEffect();

  const updateGameBoard = () => {
    _gridCells.forEach((cell, i) => cell.textContent = gameBoard.getBoardIndex(i));
  };

  const updateCurrentPlayerTurn = () => {
    _currentPlayerTurn.textContent = `👉${gameController.currentPlayer()}'s turn`;
  };

  const setResultMessage = (winner) => {
    setMessage(winner === 'draw' ? `it's a draw` : `${winner} won`);
  };

  const setMessage = (message) => _popup.textContent = message;

  _restartButton.addEventListener('click', () => {
    gameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setMessage('');
    updateCurrentPlayerTurn();
  });

  return { setResultMessage, setMessage, updateCurrentPlayerTurn, addHoverEffect };

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
      showResultMessage(currentPlayer());
      _gameIsOver = true;
      return;
    }

    if (_round === 9) {
      showResultMessage('draw');
      _gameIsOver = true;
      return;
    }

    _round++;
  };

  const currentPlayer = () => _round % 2 === 1 ? _playerX.playerSign() : _playerO.playerSign();


  const winCheck = (completedMoveIndex) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    return winConditions.some((combination) =>
      combination.includes(completedMoveIndex) &&
      combination.every((index) => gameBoard.getBoardIndex(index) === currentPlayer())
    );
  };

  const showResultMessage = (winner) => {
    _popupModal.classList.add('show');
    displayController.setResultMessage(winner);
  };

  const gameOver = () => _gameIsOver;

  const reset = () => {
    _popupModal.classList.remove('show');
    _round = 1;
    _gameIsOver = false;
  };

  return { playRound, currentPlayer, winCheck, showResultMessage, gameOver, reset };
})();

const wallpaper = (() => {
  const container = document.querySelector('#container');

  window.onmousemove = (e) => {
    let mouseX = -e.clientX / 10;
    let mouseY = -e.clientY / 10;

    container.style.backgroundPositionX = mouseX + 'px';
    container.style.backgroundPositionY = mouseY + 'px';
  }
})();
