const cells = Array.from(document.querySelectorAll('#board div'));

let board;
let turn = 'X';

const cellElements = document.querySelectorAll('[data-cell]').addEventListener('click', handleTurn, {once: true});

function init(){
    board = ['', '', '', '', '', '', '', '', ''];

    render();
}

init()

function render() {
    board.forEach((mark, index) => {
        squares[index].textContent = mark;
    });
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
