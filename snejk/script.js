let foodPosition;
let direction = "d";
let gridWithFood;
let increment = 1;
let snakeHead = [];
let playingGrid = document.querySelector(".grid");

const boardModel = {
  boardHeight: 10,
  boardWidth: 20,
  boardSize: 20,
  edgeTop: [],
  edgeLeft: [],
  edgeRight: [],
  edgeBottom: [],
  generatingBoard: function (boardSize, playingGrid) {
    const auto = "auto ".repeat(boardSize);
    playingGrid.style.gridTemplateColumns = auto;
    playingGrid.style.gridTemplateRows = auto;
    var edgeOnLeftSide = 1;
    var edgeOnRightSide = 20;

    for (let i = 1; i < boardSize * 10 + 1; i++) {
      playingGrid.innerHTML +=
        `<div class="griditem" id="grid` + i + `"></div>`;

      if (i >= 1 && i <= 20) {
        boardModel.edgeTop[i] = i - 20;
      } else if (i == edgeOnLeftSide) {
        boardModel.edgeLeft[i] = i - 1;
        edgeOnLeftSide = edgeOnLeftSide + 20;
      } else if (i == edgeOnRightSide) {
        boardModel.edgeRight[i] = i + 1;
        edgeRight = edgeOnRightSide + 20;
      } else if (i >= 181 && i <= 200) {
        boardModel.edgeBottom[i] = i + 20;
      }
    }

    boardModel.edgeTop.shift();
    boardModel.edgeLeft.shift();
    boardModel.edgeRight.shift();
    boardModel.edgeBottom.shift();
  },
  spawningFood: function () {
    foodPosition = Math.floor(
      Math.random() * (boardModel.boardHeight * boardModel.boardWidth)
    );
    if (snakeHead.includes(foodPosition)) {
      boardModel.spawningFood();
    } else {
      gridWithFood = document.getElementById(`grid` + foodPosition + ``);
      boardModel.plantingFood(gridWithFood);
    }
  },
  plantingFood: function (gridWithFood) {
    gridWithFood.innerHTML = `<div class="food"></div>`;
  },

  drawingSnakeHead: function (computedArray) {
    computation.snakeOnEdge(computedArray);
    for (let i = 0; i < computedArray.length; i++) {
      var start = document.getElementById(`grid` + computedArray[i] + ``);
      start.style.backgroundColor = "green";
      if (computedArray.includes(foodPosition)) {
        start.innerHTML = "";
        boardModel.spawningFood();
        snakeModel.snakeSizeIncreases(computedArray[0]);
      }
    }
  },

  erasingSnakeTail: function (tail) {
    document.getElementById(`grid` + tail + ``).style.backgroundColor = "black";
    snakeHead.pop(tail);
  },
};

const snakeModel = {
  snakeTail: 0,
  snakeColor: "green",
  StartingPosition: function () {
    var start = 109;
    snakeHead.unshift(start);
  },
  snakeSizeIncreases: function (elArray) {
    snakeHead.unshift(elArray);
  },
  snakeCollidesWithItself: function (nextHeadPosition) {
    if (snakeHead.includes(nextHeadPosition)) {
      clearInterval(update);
      game.allowRestart = true;
      blink = setInterval(function () {
        snakeModel.snakeBlinksOnCollision(snakeHead);
      }, 1000 / 5);
    }
  },
  snakeBlinksOnCollision: function (snakeHead) {
    var changingColor;
    if (snakeModel.snakeColor === "green") {
      snakeModel.snakeColor = "black";
    } else if (snakeModel.snakeColor === "black") {
      snakeModel.snakeColor = "green";
    }

    for (let index = 0; index < snakeHead.length; index++) {
      changingColor = document.getElementById(`grid` + snakeHead[index] + ``);
      changingColor.style.backgroundColor = snakeModel.snakeColor;
    }
  },
};

const player = {
  directionOfSnake: function (direction) {
    if (direction == "w") {
      increment = -20;
    } else if (direction == "a") {
      increment = -1;
    } else if (direction == "s") {
      increment = 20;
    } else if (direction == "d") {
      increment = 1;
    }
  },

  playerInput: function (event) {
    if (
      (direction == "d" && event.key == "a") ||
      (direction == "a" && event.key == "d") ||
      (direction == "w" && event.key == "s") ||
      (direction == "s" && event.key == "w")
    ) {
      return;
    }
    direction = event.key;
    player.directionOfSnake(direction);
  },
};

const computation = {
  updatingBoard: function (array, increment) {
    var head = array[0] + increment;
    snakeModel.snakeCollidesWithItself(head);
    array.unshift(head);
    snakeModel.snakeTail = array[array.length - 1];

    boardModel.drawingSnakeHead(array);
    boardModel.erasingSnakeTail(snakeModel.snakeTail);
  },
  snakeOnEdge: function (computedArray) {
    if (
      boardModel.edgeTop.includes(computedArray[0]) ||
      boardModel.edgeRight.includes(computedArray[0]) ||
      boardModel.edgeBottom.includes(computedArray[0]) ||
      boardModel.edgeLeft.includes(computedArray[0])
    ) {
      if (direction == "w") {
        computedArray[0] = computedArray[0] + 200;
      } else if (direction == "s") {
        computedArray[0] = computedArray[0] - 200;
      } else if (direction == "d") {
        computedArray[0] = computedArray[0] - 20;
      } else if (direction == "a") {
        computedArray[0] = computedArray[0] + 20;
      }
    }
  },
};

const game = {
  allowRestart: false,
  restartingGame: function (event) {
    if (event.key == "r" && game.allowRestart) {
      game.erasingBodyOfSnake(snakeHead);
      snakeHead = snakeHead.splice(0, 1);
      update = setInterval(function () {
        computation.updatingBoard(snakeHead, increment);
      }, 1000 / 8);
      clearInterval(blink);
      game.allowRestart = false;
    }
  },
  erasingBodyOfSnake: function (snakeBody) {
    for (let i = 1; i < snakeBody.length; i++) {
      var bodyPart = document.getElementById(`grid` + snakeBody[i] + ``);
      bodyPart.style.backgroundColor = "black";
    }
  },
};

document.body.addEventListener("keypress", player.playerInput);
document.body.addEventListener("keypress", game.restartingGame);
window.onload = boardModel.generatingBoard(boardModel.boardSize, playingGrid);
window.onload = snakeModel.StartingPosition(0, 10 * 20);
window.onload = boardModel.spawningFood;
update = setInterval(function () {
  computation.updatingBoard(snakeHead, increment);
}, 1000 / 9);
