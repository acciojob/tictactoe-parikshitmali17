//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

const submitButton = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const gameArea = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

submitButton.addEventListener("click", () => {
  const p1 = document.getElementById("player-1").value.trim();
  const p2 = document.getElementById("player-2").value.trim();

  if (p1 === "" || p2 === "") {
    alert("Please enter both player names!");
    return;
  }

  player1 = p1;
  player2 = p2;
  currentPlayer = player1;

  playerForm.style.display = "none";
  gameArea.style.display = "block";
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Winning combinations
const winningCombos = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive) return;
    if (cell.textContent !== "") return; // already filled

    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    switchPlayer();
  });
});

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  messageDiv.textContent = `${currentPlayer}, you're up!`;
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      document.getElementById(a).textContent === currentSymbol &&
      document.getElementById(b).textContent === currentSymbol &&
      document.getElementById(c).textContent === currentSymbol
    );
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}
