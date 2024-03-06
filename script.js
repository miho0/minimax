let state;

const init = () => {
  state = [
    [1, 2, 0],
    [0, 2, 0],
    [0, 2, 0],
  ];
  draw();
};

const draw = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const elm = $(`.${i}${j}`);
      switch (state[i][j]) {
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
