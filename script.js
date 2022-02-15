'use strict'

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
};

const gameBoard = (() => {

    const board = ['', '', '', '', '', '', '', '', ''];

    const setIndex = (index, sign) => { // setField
        if (index > board.length) return;
        board[index] = sign;
    };

    const getIndex = (index) => { // getIField
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
    };

    return { setIndex, getIndex, reset }

})();
