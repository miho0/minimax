let board;
let turnPlayer = true;

const init = () => {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  draw();
};

const draw = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const elm = $(`.${i}${j}`);
      switch (board[i][j]) {
        case 0:
          elm.html("");
          break;
        case 1:
          elm.html("<p class='filled'>O</p>");
          break;
        case 2:
          elm.html("<p class='filled'>X</p>");
          break;
        default:
          console.log("how did this happen??");
      }
    }
  }
};

init();

const playerMove = (e) => {
  const field = e.target.classList[0];
  move(field);
};

const move = (field) => {
  const x = field[0];
  const y = field[1];
  if (board[x][y] === 0) {
    if (turnPlayer) board[x][y] = 1;
    else board[x][y] = 2;
    console.log(getResult());
    draw();
    turnPlayer = !turnPlayer;
    if (!turnPlayer) AIMove();
  }
};

const getResult = () => {
  if (board[0][0] === board[0][1] && board[0][1] === board[0][2])
    return board[0][0];
  if (board[1][0] === board[1][1] && board[1][1] === board[1][2])
    return board[1][0];
  if (board[2][0] === board[2][1] && board[2][1] === board[2][2])
    return board[2][0];

  if (board[0][0] === board[1][0] && board[1][0] === board[2][0])
    return board[0][0];
  if (board[0][1] === board[1][1] && board[1][1] === board[2][1])
    return board[0][1];
  if (board[0][2] === board[1][2] && board[1][2] === board[2][2])
    return board[0][2];

  if (board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return board[0][0];
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return board[0][2];

  return 0;
};

const getAllPossibleMoves = () => {};

const AIMove = () => {
  if (!turnPlayer) {
  }
};

const minimax = () => {
  // dobimo vse možne poteze
  // za vsako potezo hipotetično
};

$(document).ready(function () {
  $(".field").click((e) => playerMove(e));
});

// heutistic function:
// if win, 10
// if lose, 0
