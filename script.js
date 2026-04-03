const board = document.querySelector('.board');
const playPauseButton = document.querySelector('.play-pause-btn');
const iterationCount = document.querySelector('.iteration-count');
const resetButton = document.querySelector('.reset-btn')
let allowedSquarePick = true;
let playOrPause = true; // play = true, pause = false
let iterationCounter = 0;
const needToChange = [];

// Creates the board
function create_board() {
  for (let x = 0; x < 50; x++) {
    row = document.createElement('div');
    row.classList.add('row');
    board.appendChild(row);

    for (let y = 0; y < 50; y++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.id = `x${fixCoord(x)}-y${fixCoord(y)}`
      row.appendChild(square);

      square.addEventListener('click', () => { selectSquare(square) });
    }
  }
}

// Fix coords by adding a zero in front of single numbers
function fixCoord(coord) { 
  return coord < 10 ? `0${coord}` : coord
}

// Lets users pick squares
function selectSquare(square) {
  if (allowedSquarePick == false) { return; }
  square.classList.toggle('alive')
}

create_board();

// Starts interval when play button is clicked
playPauseButton.addEventListener('click', () => {
  if (playOrPause == true) {
    gameOfLifeLoop = setInterval(gameOfLife, 500);
    playOrPause = false;
    allowedSquarePick = false;
  } else {
    setTimeout(() => { clearInterval(gameOfLifeLoop); }, 1);
    playOrPause = true;
    allowedSquarePick = true;
  }

  playPauseButton.innerText = playOrPause == true ? "Play" : "Pause";
});

// Game of life loop function
function gameOfLife() {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) { 
      aliveOrDead(document.querySelector(`#x${fixCoord(x)}-y${fixCoord(y)}`)); 
    }
  }

  addChanges();
  iterationCount.innerText = (iterationCounter += 1);
}

// Change squares to their new color
function addChanges() {
  needToChange.forEach(item => {
    item[0] == "alive" ? item[1].classList.add('alive') : item[1].classList.remove('alive')
  });
}

// Checks if square is alive or dead
function aliveOrDead(square) {
  let squareId = square.id.split('');
  let squareState = square.classList[1] == "alive" ? true : false // Alive is true, dead is false
  let neighbors = numOfNeighbors(squareId);

  if (squareState == true && (neighbors < 2 || neighbors > 3)) { 
    needToChange.push(["dead", square])
  } else if ((squareState == true && (neighbors == 2 || neighbors == 3)) || (squareState == false && neighbors == 3)) { 
    needToChange.push(["alive", square])
  }
}

// Calculate number of neighbors a square has
function numOfNeighbors(squareId) {
  let xCoord = parseInt(`${squareId[1]}${squareId[2]}`);
  let yCoord = parseInt(`${squareId[5]}${squareId[6]}`);
  let aliveNeighbors = 0;

    // Top ones
  if (document.querySelector(`#x${fixCoord(xCoord + 1)}-y${fixCoord(yCoord + 1)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord + 1)}-y${fixCoord(yCoord + 1)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  if (document.querySelector(`#x${fixCoord(xCoord + 1)}-y${fixCoord(yCoord - 1)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord + 1)}-y${fixCoord(yCoord - 1)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  if (document.querySelector(`#x${fixCoord(xCoord + 1)}-y${fixCoord(yCoord)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord + 1)}-y${fixCoord(yCoord)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  // Middle ones
  if (document.querySelector(`#x${fixCoord(xCoord)}-y${fixCoord(yCoord + 1)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord)}-y${fixCoord(yCoord + 1)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  if (document.querySelector(`#x${fixCoord(xCoord)}-y${fixCoord(yCoord - 1)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord)}-y${fixCoord(yCoord - 1)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  // Bottom ones
  if (document.querySelector(`#x${fixCoord(xCoord - 1)}-y${fixCoord(yCoord + 1)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord - 1)}-y${fixCoord(yCoord + 1)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  if (document.querySelector(`#x${fixCoord(xCoord - 1)}-y${fixCoord(yCoord - 1)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord - 1)}-y${fixCoord(yCoord - 1)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  if (document.querySelector(`#x${fixCoord(xCoord - 1)}-y${fixCoord(yCoord)}`) != null && 
      document.querySelector(`#x${fixCoord(xCoord - 1)}-y${fixCoord(yCoord)}`).classList[1] == "alive") {
    aliveNeighbors += 1;
  }

  return aliveNeighbors;
}

resetButton.addEventListener('click', () => {
  board.innerHTML = null
  create_board();
  iterationCount.innerText = (iterationCounter = 0);
});
