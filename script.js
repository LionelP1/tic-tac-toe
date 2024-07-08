"use strict";

//Player Object Factory Constructor
const Player = (sign) => {
    this.sign = sign;
    const getSign = () => {return sign;}
    return {getSign};
};

// Module for game board
const gameBoard = (()=>{
    const board = ["", "", "", "", "", "", "", "", ""];

    const setBoardIndex = (index, sign) => {
        board[index] = sign;
    };

    const getBoardIndex = (index) => {
        return board[index];
    };

    const resetBoard = () =>{
        for(let i=0; i < board.length; i++){
            board[i] = "";
        }
    };

    return {board, setBoardIndex, getBoardIndex, resetBoard};
})();

