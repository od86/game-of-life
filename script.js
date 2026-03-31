let board = document.querySelector('.board');

function create_board() {
  for (let x = 0; x < 50; x++) {
    row = document.createElement('div');
    row.classList.add('row');
    board.appendChild(row);

    for (let y = 0; y < 50; y++) {
      square = document.createElement('div');
      square.classList.add('square');
      row.appendChild(square);
    }
  }
}

create_board();