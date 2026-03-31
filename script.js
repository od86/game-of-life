const board = document.querySelector('.board');
const playButton = document.querySelector('.play-btn')
let allowedSquarePick = true;

function create_board() {
  for (let x = 0; x < 50; x++) {
    row = document.createElement('div');
    row.classList.add('row');
    board.appendChild(row);

    for (let y = 0; y < 50; y++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.id = `${x}/${y}`
      row.appendChild(square);

      square.addEventListener('click', () => { selectSquare(square) });
    }
  }
}

function selectSquare(square) {
  if (allowedSquarePick == false) { return; }

  if (square.style.backgroundColor == "red") {
    square.setAttribute("style", "background-color: rgb(105, 105, 105);")
  } else {
    square.setAttribute("style", "background-color: red;")
  }
}

create_board();

