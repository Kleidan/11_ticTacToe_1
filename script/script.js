// create variables
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-mesasge-text]');
const restartBtn = document.getElementById('restartBtn');
// create X and Circle classes
const xClass = 'x';
const circleClass = 'circle';

// a boolean variable to help set the turns
let circleTurn

// winning combinations array

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// create a function that starts the game
startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
    // {once:true} => to block subsequent clicks on the same cell
  });
  BoardHoverClasses();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  // get the clicked cell
  const cell = e.target;

  // determine turn and place marks
  const currentClass = circleTurn ? circleClass : xClass;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    BoardHoverClasses();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function BoardHoverClasses() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  if (circleTurn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winningCombos.some(combos => {
    return combos.every(i => {
      return cellElements[i].classList.contains(currentClass);
    })
  })
}