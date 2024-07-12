"use strict";

//Player Object Factory Constructor
const Player = (sign, isComputer = false) => {
    this.sign = sign;
    this.isComputer = isComputer;
    const getSign = () => {return sign;}
    const getIsComputer = () => {return isComputer;}
    return {getSign, getIsComputer};
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


//Module for the game controller
const gameController = (() => {
    let move = 1;
    let isOver = false;
    let mode = "twoPlayer";

    let playerX;
    let playerO;


    if(mode === "twoPlayer"){
        playerX = Player("X");
        playerO = Player("O");
    }else if(mode === "onePlayer"){
        playerX = Player("X");
        playerO = Player("O", true);
    }
    else if (mode === "zeroPlayer") {
        playerX = Player("X", true);
        playerO = Player("O", true);
    }

    const playMove = (inputIndex) => {
        gameBoard.setBoardIndex(inputIndex, getCurrentPlayerSign());
        
        if(checkWin(inputIndex)){
            displayControls.setMessageElement(`${getCurrentPlayerSign()} has won!`);
            displayControls.openPopup(`${getCurrentPlayerSign()} has won the game!`, "🏆");
            isOver = true;
            return;
        }
        if(move === 9){
            displayControls.setMessageElement("Its a draw!");
            displayControls.openPopup("Its a draw!", "🤷");
            isOver = true;
            return;
        }
        move++;
        displayControls.setMessageElement(`Player ${getCurrentPlayerSign()} Turn`);
    };

    const getRandomLegalMove = () => {
        const emptyIndices = [];
        for (let i = 0; i < gameBoard.board.length; i++) {
            if (gameBoard.board[i] === "") {
                emptyIndices.push(i);
            }
        }
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        return randomIndex;
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
            return playerX.getSign();
        }
        else{
            return playerO.getSign();
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

    const getMode = () => {
        return mode;
    };

    const setMode = (modeToSet) => { 
        mode = modeToSet;
    };

    return {playMove, reset, getCurrentPlayerSign, getIsOver, getRandomLegalMove, getMode, setMode};

})();




//Module for the display controls
const displayControls = (() => {
    const inputElements = document.querySelectorAll(".input");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restartBtn");
    const onePlayerButton = document.getElementById("onePlayerBtn");
    const twoPlayerButton = document.getElementById("twoPlayerBtn");
    const zeroPlayerButton = document.getElementById("zeroPlayerBtn");
    const popup = document.querySelector(".popup");
    const close = document.querySelector(".close");
    const popupMessage = document.getElementById("popupMessage");
    const emojiDiv = document.getElementById("emojiDiv");
    const closeBtn = document.querySelector(".closeBtn");

    let gameRunning = false;


    const openPopup = (message, emoji) => {
        popupMessage.textContent = message;
        emojiDiv.textContent = emoji;
        popup.style.display = "flex";
    };

    close.addEventListener("click", () => {
        popup.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });




    inputElements.forEach((input) =>
        input.addEventListener("click", (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "" 
            || gameController.getMode() === "zeroPlayer" || gameRunning === true) {return;};

            if(gameController.getMode() === "twoPlayer"){
                e.target.textContent = gameController.getCurrentPlayerSign();
                gameController.playMove(parseInt(e.target.dataset.index));
            }
            else if (gameController.getMode() === "onePlayer") {
                gameRunning = true;
                e.target.textContent = gameController.getCurrentPlayerSign();
                gameController.playMove(parseInt(e.target.dataset.index));
    
                if (gameController.getIsOver()) {return;}
    
                setTimeout(() => {
                    let randomIndex = gameController.getRandomLegalMove();
                    inputElements[randomIndex].textContent = gameController.getCurrentPlayerSign();
                    gameController.playMove(randomIndex);
                    gameRunning = false;
                }, 800);
            }
    }));

    onePlayerButton.addEventListener("click",(e) => {
        resetEverything();
        onePlayerButton.style.backgroundColor = '#4682B4';
        twoPlayerButton.style.backgroundColor = '#f0f0f0';
        zeroPlayerButton.style.backgroundColor = '#f0f0f0';
        gameController.setMode("onePlayer");
    });

    twoPlayerButton.addEventListener("click",(e) => {
        resetEverything();
        twoPlayerButton.style.backgroundColor = '#4682B4';
        onePlayerButton.style.backgroundColor = '#f0f0f0';
        zeroPlayerButton.style.backgroundColor = '#f0f0f0';
        gameController.setMode("twoPlayer");
    });

    zeroPlayerButton.addEventListener("click",(e) => {
        resetEverything();
        twoPlayerButton.style.backgroundColor = '#f0f0f0';
        onePlayerButton.style.backgroundColor = '#f0f0f0';
        zeroPlayerButton.style.backgroundColor = '#4682B4';
        gameController.setMode("zeroPlayer");
        playZeroPlayerGame();
    });

    restartButton.addEventListener("click", (e) => {
        resetEverything();
        if(gameController.getMode() === "zeroPlayer"){
            playZeroPlayerGame();
        }
    });

    let gameInterval;
    const playZeroPlayerGame = () => {
        clearInterval(gameInterval); 
    
        gameInterval = setInterval(() => {
            if (gameController.getIsOver()) {
                clearInterval(gameInterval);
                return;
            }
            let randomIndex = gameController.getRandomLegalMove();
            inputElements[randomIndex].textContent = gameController.getCurrentPlayerSign();
            gameController.playMove(randomIndex);
        }, 800);
    
        gameRunning = true;
    };
    
    // Function to reset game completely
    const resetGame = () => {
        clearInterval(gameInterval);
        gameRunning = false;
    };

    const resetEverything = () => {
        clearDisplay();
        gameBoard.resetBoard();
        gameController.reset();
        resetGame();
    };

    const clearDisplay = () => {
        setMessageElement(`Player X Turn`);
        for (let i = 0; i < inputElements.length; i++) {
          inputElements[i].textContent = "";
        }
    };


    const setMessageElement = (message) => {
        messageElement.textContent = message;
      };
    
    return {setMessageElement, openPopup};
})();


