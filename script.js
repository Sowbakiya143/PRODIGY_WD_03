// script.js
let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp"; // default mode

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    boardElement.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin(currentPlayer)) {
    statusElement.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.textContent = `Turn: ${currentPlayer}`;

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let emptyIndices = board.map((val, idx) => val ? null : idx).filter(val => val !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleClick(randomIndex);
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `Turn: ${currentPlayer}`;
  renderBoard();
}

renderBoard();