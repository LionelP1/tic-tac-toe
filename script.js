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




const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let move = 1;
    let isOver = false;


    const playMove = (inputIndex) => {
        gameBoard.setBoardIndex(inputIndex,getCurrentPlayerSign());
        //Now display the symbol on screen

        if(checkWin(inputIndex)){
            //Display Message
            isOver = true;
            return;
        }

        if(move === 9){
            //display message:Draw
            isOver = true;
            return;
        }
        move++;
    };
    
    const reset = () => {
        move = 1;
        isOver = false;
    };

    const getIsOver = () => {
        return isOver;
      };
    
    const getCurrentPlayerSign = () => {
        if(move % 2 === 1){
            return playerO.getSign();
        }
        else{
            return playerX.getSign();
        }
    };

    const checkWin = (inputIndex) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    
        for (let combo of winningCombinations) {
            if (combo.includes(inputIndex)) {
                const [a, b, c] = combo;
                if (gameBoard.getBoardIndex(combo[0]) !== "" &&
                gameBoard.getBoardIndex(combo[0]) === gameBoard.getBoardIndex(combo[1]) &&
                gameBoard.getBoardIndex(combo[0]) === gameBoard.getBoardIndex(combo[2])) {
                return true;
                }
            }
        }
        return false;
    };

    return {playMove, reset, getIsOver};

})();








//Module for dispay controls
const displayControls = (() => {
    const inputElements = document.querySelectorAll(".input");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restartBtn");
    const onePlayerButton = document.getElementById("onePlayerBtn");
    const twoPlayerButton = document.getElementById("twoPlayerBtn");


    restartButton.addEventListener("click", (e) => {
        gameBoard.resetBoard();
    });





})();


