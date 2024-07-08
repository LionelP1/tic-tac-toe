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

    const getCurrentPlayerSign = () => {
        if(move % 2 === 1){
            return playerO.getSign();
        }
        else{
            return playerX.getSign();
        }
    };


    const playMove = (fieldIndex) => {
        gameBoard.setBoardIndex(fieldIndex,getCurrentPlayerSign());
        //Now display the symbol on screen


        if(/*Player Wins */){
            //Display Message
            //return
        }

        if(round === 9){
            //display message:Draw
            //Return
        }


        move++;



    };
    


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


