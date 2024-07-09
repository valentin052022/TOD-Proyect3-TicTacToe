// "use strict";

// const winnerForms = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 4, 8],
//   [2, 4, 6],
//   [0, 4, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
// ];

// const game = (function () {
  
//   function Player(name, token) {
//     return {
//       name,
//       token,
//     };
//   }

//   function Board() {
//     return { board: ["", "", "", "", "", "", "", "", ""] };
//   }

//   function GameController() {
//     const board = Board().board;
//     const p1 = Player("Vale", "X");
//     const p2 = Player("Lucas", "O");
//     let currentTurn = p1;
//     let isActive = true

//     function Turn(position) {
//       if (board[position] == "") {
//         if(isActive){
//           board[position] = currentTurn.token;
//           currentTurn = currentTurn === p1 ? p2 : p1;
//         } else {

//         }
//       } else {
//         console.log("Mismo lugar paaaa");
//       }
//       return { board };
//     }

//     return { Turn };
//   }

//   return { Player, Board, GameController };
// })();


// const play = game.GameController();

// function mostarBoard() {
//   const main = document.querySelector(".main");
//   for (let i = 0; i < game.Board().board.length; i++) {
//     const span = document.createElement("span");
//     span.setAttribute("data-position", i);
//     span.classList.add("celda");
//     main.appendChild(span);
//   }
// }

// function actualizarBoard(board) {
//   const cells = document.querySelectorAll(".celda");
//   cells.forEach((cell, i) => {
//     cell.textContent = board[i];
//   });
// }

// function jugar() {
//   const cells = document.querySelectorAll(".celda");
//   cells.forEach((item) => {
//     item.addEventListener("click", () => {
//       let pos = item.getAttribute("data-position");
//       actualizarBoard(play.Turn(pos).board);
//     });
//   });
// }


// function deternerJuego(){

// }

// mostarBoard();
// jugar();

