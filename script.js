const board = document.querySelector('.board');
const playPauseButton = document.querySelector('.play-pause-btn');
const iterationCount = document.querySelector('.iteration-count');
let allowedSquarePick = true;
let playOrPause = true; // play = true, pause = false
let iterationCounter = 0;
const needToChange = [];

function create_board() {
  for (let x = 0; x < 60; x++) {
    row = document.createElement('div');
    row.classList.add('row');
    board.appendChild(row);

    for (let y = 0; y < 60; y++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.id = `x${fixCoord(x)}-y${fixCoord(y)}`
      row.appendChild(square);

      square.addEventListener('click', () => { selectSquare(square) });
    }
  }
}

function fixCoord(coord) { 
  return coord < 10 ? `0${coord}` : coord
}

function selectSquare(square) {
  if (allowedSquarePick == false) { return; }
  square.classList.toggle('alive')
}

create_board();

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

function gameOfLife() {
  for (let x = 0; x < 60; x++) {
    for (let y = 0; y < 60; y++) { 
      aliveOrDead(document.querySelector(`#x${fixCoord(x)}-y${fixCoord(y)}`)); 
    }
  }

  addChanges();
  iterationCount.innerText = (iterationCounter += 1);
}

function addChanges() {
  needToChange.forEach(item => {
    item[0] == "alive" ? item[1].classList.add('alive') : item[1].classList.remove('alive')
  });
}

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
