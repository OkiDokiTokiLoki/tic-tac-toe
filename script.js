const squares = Array.from(document.querySelectorAll('#board div'));

let board;
let turn = 'X';

// const cellElements = document.querySelectorAll('[data-cell]').addEventListener('click', handleTurn, {once: true});
document.getElementById('board').addEventListener('click', handleTurn);

function init(){
    board = ['', '', '', '', '', '', '', '', ''];
}

init()

function render() {
    board.forEach((mark, index) => {
        squares[index].textContent = mark;
    });
};

function handleTurn(e) {
    let idx = squares.findIndex(function(square) {
        return square === e.target;
    });

    board[idx] = turn;

    turn = turn === 'X' ? 'O' : 'X';
    render();
};

// 'use strict'

// const Player = (sign) => {
//     this.sign = sign;

//     const getSign = () => {
//         return sign;
//     }

//     return { getSign };
// };

// const gameBoard = (() => {

//     const board = ['', '', '', '', '', '', '', '', ''];

//     const setIndex = (index, sign) => { // setField
//         if (index > board.length) return;
//         board[index] = sign;
//     };

//     const getIndex = (index) => { // getIField
//         if (index > board.length) return;
//         return board[index];
//     };

//     const reset = () => {
//         for (let i = 0; i < board.length; i++){
//             board[i] = '';
//         }
//     };

//     return { setIndex, getIndex, reset }

// })();
