let board;
let turnPlayer = true;
let winner = 0;

let bestAIMove;

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

  switch (winner) {
    case 1:
      console.log("player wins");
      break;
    case 2:
      console.log("Ai wins!");
      break;
    case -1:
      console.log("Draw");
      break;
    default:
      console.log("Game in progress");
  }
};

init();

const playerMove = (e) => {
  const field = e.target.classList[0];
  move(field);
};

const move = (field) => {
  if (winner === 0) {
    const x = field[0];
    const y = field[1];
    if (board[x][y] === 0) {
      if (turnPlayer) board[x][y] = 1;
      else board[x][y] = 2;
      winner = getResult();
      draw();
      turnPlayer = !turnPlayer;
      if (!turnPlayer) AIMove();
    }
  }
};

const getAllPossibleMoves = () => {
  let possibleMoves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        possibleMoves.push(`${i}${j}`);
      }
    }
  }
  return possibleMoves;
};

// returns the result code: 1 - player wins, 2 - AI wins, -1 - draw, 0 - game still in progress
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

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) return 0;
    }
  }

  return -1;
};

const AIMove = () => {
  minimax(true, 0);
  move(bestAIMove);
};

const minimax = (maximizing, depth) => {
  // TODO heuristic function here
  const result = getResult();
  if (result === -1) return 0;
  if (result === 1) return -10;
  if (result === 2) return 10;

  const possibleMoves = getAllPossibleMoves();
  if (maximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < possibleMoves.length; i++) {
      const x = possibleMoves[i][0];
      const y = possibleMoves[i][1];
      board[x][y] = 2;
      const score = minimax(false, depth + 1);
      board[x][y] = 0;
      if (score > bestScore) {
        bestScore = score;
        if (depth === 0) bestAIMove = possibleMoves[i];
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < possibleMoves.length; i++) {
      const x = possibleMoves[i][0];
      const y = possibleMoves[i][1];
      board[x][y] = 1;
      const score = minimax(true, depth + 1);
      board[x][y] = 0;
      if (score < bestScore) bestScore = score;
    }
    return bestScore;
  }
};

$(document).ready(function () {
  $(".field").click((e) => playerMove(e));
});

// TODO:
// heuristic function, difficulty - depth
// restart (player first, then AI first)
