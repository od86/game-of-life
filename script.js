const board = document.querySelector('.board');
const playButton = document.querySelector('.play-btn')
const stopButton = document.querySelector('.stop-btn');

let allowedSquarePick = true;
let gamePlaying = false;

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

function fixCoord(coord) { 
  return coord < 10 ? `0${coord}` : coord
}

function selectSquare(square) {
  if (allowedSquarePick == false) { return; }

  square.classList.toggle('alive')
}

create_board();



playButton.addEventListener('click', () => {
  let gameOfLifeLoop = setInterval(gameOfLife, 5000);
  stopButton.addEventListener('click', () => {
    setTimeout(() => { clearInterval(gameOfLifeLoop); }, 500); 
  })
});

function gameOfLife() {
  allowedSquarePick = false;

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) { 
      aliveOrDead(document.querySelector(`#x${fixCoord(x)}-y${fixCoord(y)}`)); 
    }
  }
}

// x00-y00
function aliveOrDead(square) {
  let squareId = square.id.split('');
  let squareState = square.classList[1] == "alive" ? true : false // Alive is true, dead is false
  let neighbors = numOfNeighbors(squareId);
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

// Live cell: < 2 neighbors = dies
// Live cell: 2 || 3 neighbors = survives
// Live cell: > 3 neighbors = dies
// Dead cell: == 3 neighbors = survives
