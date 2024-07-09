"use strict";

const main = document.querySelector(".main");
const cont_turner = document.querySelector(".cont-turner");
const alert = document.querySelector(".alert");
let playerOne = "";
let playerTwo = "";

const creatorFactoryGame = (function () {
  function Player(simbol) {
    return { simbol };
  }

  function Board() {
    return { board: ["", "", "", "", "", "", "", "", ""] };
  }
  return { Player, Board };
})();

const GameController = (function () {
  let isActiveGame = true;
  const board = creatorFactoryGame.Board().board;
  const player1 = creatorFactoryGame.Player("X").simbol;
  const player2 = creatorFactoryGame.Player("O").simbol;
  let currentTurn = player1;
  let lastClickedCell = null;
  const winnerForms = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  function Turn(position) {
    if (isActiveGame) {
      const turn_icon = document.getElementById("turn");

      if (board[position] == "") {
        board[position] = currentTurn;
        currentTurn = currentTurn === player1 ? player2 : player1;
        currentTurn === "X"
          ? (turn_icon.innerHTML = `<b>X</b>`)
          : (turn_icon.innerHTML = `<b>O</b>`);

        const winner = isWinner();
        if (winner === "X") {
          visulizationDOM.showWinner(playerOne, "🎉 is the winner 🎉");
          visulizationDOM.hiddenGame();
          isActiveGame = false;
        } else if (winner === "O") {
          visulizationDOM.showWinner(playerTwo, "🎉 is the winner 🎉");
          visulizationDOM.hiddenGame();
          isActiveGame = false;
        } else if (winner === "tie") {
          visulizationDOM.showWinner("tie", "It's a tie, play again!");
          visulizationDOM.hiddenGame();
          isActiveGame = false;
        }
      } else {
        if (position === lastClickedCell) {
          if(currentTurn == player1){
            visulizationDOM.showAlert(playerOne,"You clicked the same place");
          } else {
            visulizationDOM.showAlert(playerTwo,"You clicked the same place");

          }
          
        }
      }
      lastClickedCell = position;
    }

    return board;
  }

  function isWinner() {
    for (let i = 0; i < winnerForms.length; i++) {
      const [a, b, c] = winnerForms[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== "")) {
      return "tie"; // Si todas las celdas están llenas y no hay ganador, es un empate
    }
    return null;
  }

  return { Turn };
})();

const visulizationDOM = (function () {
  function start() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name1 = document.getElementById("player1").value;
      const name2 = document.getElementById("player2").value;
      playerOne = name1;
      playerTwo = name2;
      form.style.display = "none";
      main.style.display = "grid";
      cont_turner.style.display = "flex";
    });
  }

  function createBoard() {
    const main = document.querySelector(".main");
    for (let i = 0; i < creatorFactoryGame.Board().board.length; i++) {
      const span = document.createElement("span");
      span.setAttribute("data-position", i);
      span.classList.add("celda");
      main.appendChild(span);
    }
  }

  function updateBoard(board) {
    const cells = document.querySelectorAll(".celda");
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  }

  function jugar() {
    const cells = document.querySelectorAll(".celda");
    cells.forEach((item) => {
      item.addEventListener("click", () => {
        let pos = item.getAttribute("data-position");
        visulizationDOM.updateBoard(play.Turn(pos));
      });
    });
  }

  function showWinner(playerWinner, text) {
    const body = document.getElementById("body");
    const divWinner = document.createElement("div");
    const span = document.createElement("span");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");

    body.appendChild(divWinner);
    divWinner.classList.add("winner");

    span.textContent = playerWinner;
    divWinner.appendChild(span);

    h2.textContent = text;
    divWinner.appendChild(h2);

    button.classList.add("btn");
    button.textContent = "Restart Game";
    button.addEventListener("click", () => {
      location.reload();
    });
    divWinner.appendChild(button);
  }

  function hiddenGame() {
    main.style.display = "none";
    cont_turner.style.display = "none";
  }

  function showAlert(playerWinner, text) {
    const alertDiv = document.getElementById("alert");
    const alertText = document.getElementById("alert-text");
    const progressBar = document.querySelector(".progress-bar");

    alertText.textContent = `${playerWinner} ${text}`;
    alertDiv.style.display = "block";

    // Reset progress bar
    progressBar.style.width = "0%";

    // Start progress bar animation
    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 100); // Slight delay to ensure the transition starts

    // Hide alert after 5 seconds
    setTimeout(() => {
      alertDiv.style.animation = "hideAlert 1s forwards";
    }, 2000);

    // Completely remove the alert after the animation
    setTimeout(() => {
      alertDiv.style.display = "none";
      alertDiv.style.animation = "";
      progressBar.style.width = "0%"; // Reset for next use
    }, 3000); // Extra second to match the hideAlert animation duration
  }

  return {
    showAlert,
    createBoard,
    updateBoard,
    jugar,
    start,
    showWinner,
    hiddenGame,
  };
})();

const play = GameController;
visulizationDOM.start();
visulizationDOM.createBoard();
visulizationDOM.updateBoard(play.Turn());
visulizationDOM.jugar();
