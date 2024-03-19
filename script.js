let board;
let startingPlayer = true;
let turnPlayer = true;
let winner = 0;

let bestAIMove;
let difficulty = 5;

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

  const gameStatusElm = $(".gameStatus");

  switch (winner) {
    case 1:
      gameStatusElm.html("Player wins!");
      break;
    case 2:
      gameStatusElm.html("AI wins!");
      break;
    case -1:
      gameStatusElm.html("Draw!");
      break;
    default:
      gameStatusElm.html("Game in progress.");
  }
};

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

const getGameValue = () => {
  let score = 0;
  for (let i = 0; i < 3; i++) {
    let aiValuesRow = 0;
    let playerValuesRow = 0;
    let aiValuesColumn = 0;
    let playerValuesColumn = 0;
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 1) playerValuesRow++;
      if (board[i][j] === 2) aiValuesRow++;
      if (board[j][i] === 1) playerValuesColumn++;
      if (board[j][i] === 2) aiValuesColumn++;
    }
    score += Math.pow(2, aiValuesRow) + Math.pow(2, aiValuesColumn);
    score -= Math.pow(2, playerValuesRow) + Math.pow(2, playerValuesColumn);
  }

  let playerValuesD1 = 0;
  let aiValuesD1 = 0;
  let playerValuesD2 = 0;
  let aiValuesD2 = 0;

  if (board[1][1] === 1) {
    playerValuesD1++;
    playerValuesD2++;
  }

  if (board[1][1] === 2) {
    aiValuesD1++;
    aiValuesD2++;
  }

  if (board[0][0] === 1) playerValuesD1++;
  if (board[0][0] === 2) aiValuesD1++;

  if (board[2][2] === 1) playerValuesD1++;
  if (board[2][2] === 2) aiValuesD1++;

  if (board[2][1] === 1) playerValuesD1++;
  if (board[2][1] === 2) aiValuesD1++;

  if (board[1][2] === 1) playerValuesD1++;
  if (board[1][2] === 2) aiValuesD1++;

  score += Math.pow(2, aiValuesD1) + Math.pow(2, aiValuesD2);
  score -= Math.pow(2, playerValuesD1) + Math.pow(2, playerValuesD2);
  return score;
};

const AIMove = () => {
  minimax(true, 0, -Infinity, Infinity);
  move(bestAIMove);
};

const minimax = (maximizing, depth, alpha, beta) => {
  // if game is over, return max / min value / 0 if draw
  const result = getResult();
  if (result === -1) return 0;
  if (result === 1) return -100;
  if (result === 2) return 100;

  const possibleMoves = getAllPossibleMoves();

  // if game is not over and depth is greater than difficulty, return game value based on heuristic function
  if (depth >= difficulty) return getGameValue();

  if (maximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < possibleMoves.length; i++) {
      const x = possibleMoves[i][0];
      const y = possibleMoves[i][1];
      board[x][y] = 2;
      const score = minimax(false, depth + 1, alpha, beta);
      board[x][y] = 0;
      if (score > bestScore) {
        bestScore = score;
        if (depth === 0) bestAIMove = possibleMoves[i];
      }
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < possibleMoves.length; i++) {
      const x = possibleMoves[i][0];
      const y = possibleMoves[i][1];
      board[x][y] = 1;
      const score = minimax(true, depth + 1, alpha, beta);
      board[x][y] = 0;
      if (score < bestScore) bestScore = score;
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return bestScore;
  }
};

const startNewGame = () => {
  init();
  startingPlayer = !startingPlayer;
  turnPlayer = startingPlayer;
  if (!turnPlayer) AIMove();
};

const init = () => {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  winner = 0;
  bestAIMove = undefined;
  difficulty = $("#difficulty").val();
  draw();
};

init();

$(document).ready(function () {
  $(".field").click((e) => playerMove(e));
  $(".startGameBtn").click(startNewGame);
});
