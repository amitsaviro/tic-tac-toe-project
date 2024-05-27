const boxs = document.querySelectorAll(".box");
const statusTxt = document.querySelector("#status");
const btnRestart = document.querySelector("#restart");
const counterTxt = document.querySelector("#counter");
const xWinTxt = document.querySelector(".x-win");
const oWinTxt = document.querySelector(".o-win");
const drawTxt = document.querySelector(".draw");
const human = document.querySelector(".human-pic");
const computer = document.querySelector(".computer-pic");
const firstPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".second-page");
const back = document.querySelector(".back");
let x = "X",
  o = "O",
  counterX = 0,
  counterO = 0,
  counterDraw = 0;

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""],
  currentPlayer = x,
  player = "X",
  running = false,
  singlePlayer = false,
  isPlayed = false;
init();
back.addEventListener("click", function () {
  location.reload(true);
});

function init() {
  firstPage.style.display = "block";
  gamePage.style.display = "none";
  computer.addEventListener("click", function () {
    console.log("computer"); // בדיקה
    firstPage.style.display = "none";
    gamePage.style.display = "block";
    alert("You are pleyer X");
    singlePlayer = true;
    if (singlePlayer && currentPlayer === "O") {
      setTimeout(makeComputerMove, 1000);
    }
  });
  human.addEventListener("click", function () {
    console.log("human");
    firstPage.style.display = "none";
    gamePage.style.display = "block";
    singlePlayer = false;
  });
  boxs.forEach((box) => box.addEventListener("click", boxClick));
  btnRestart.addEventListener("click", restartGame);
  statusTxt.textContent = `${player} Your Turn`;
  running = true;
}

function boxClick() {
  const index = this.dataset.index;
  if (!running) {
    alert("The game is over plese press restart for new one!");
    return;
  } else if (options[index] != "") {
    alert("You need to choose an empty box!");
    return;
  }
  if (singlePlayer && isPlayed) return;
  isPlayed = true;
  updateBox(this, index);
  checkWinner();
  if (singlePlayer && currentPlayer === "O" && running) {
    setTimeout(makeComputerMove, 1000);
  }
}

function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
  currentPlayer = currentPlayer == x ? o : x;
  statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxs[condition[0]].classList.add("win");
      boxs[condition[1]].classList.add("win");
      boxs[condition[2]].classList.add("win");
    }
  }

  if (isWon) {
    statusTxt.textContent = `${player} Won..`;
    running = false;
    winnersTable(player);
  } else if (!options.includes("")) {
    statusTxt.textContent = `Game Draw..!`;
    running = false;
    winnersTable();
  } else {
    changePlayer();
  }
}

function winnersTable(who) {
  if (who == "X") {
    counterX++;
  } else {
    if (who == "O") {
      counterO++;
    } else {
      counterDraw++;
    }
  }
  xWinTxt.textContent = counterX;
  oWinTxt.textContent = counterO;
  drawTxt.textContent = counterDraw;
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  statusTxt.textContent = `${player} Your Turn`;
  boxs.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
  isPlayed = false;
}

function makeComputerMove() {
  if (singlePlayer && currentPlayer === "O") {
    const emptyCells = options.reduce((indices, cell, index) => {
      if (cell === "") indices.push(index);
      return indices;
    }, []);

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const computerMoveIndex = emptyCells[randomIndex];
      const computerCell = boxs[computerMoveIndex];

      updateBox(computerCell, computerMoveIndex);
      checkWinner();
    }
  }
  isPlayed = false;
}