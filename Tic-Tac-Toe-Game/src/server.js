const express = require("express");
const { v4: uuid } = require("uuid");

let games = [
  {
    id: "101",
    playerXMoves: [],
    playerOMoves: [],
  },
];

const app = express();
app.use(express.json());

function getPairs(arr1, arr2) {
  return arr1.flatMap((letter) => arr2.map((number) => letter + number));
}

function generateTicTacToeMoves() {
  return getPairs(["A", "B", "C"], ["1", "2", "3"]);
}

app.post("/games", (req, res) => {
  const newGameId = uuid();
  const newGame = {
    id: newGameId,
    playerXMoves: [],
    playerOMoves: [],
    availableMoves: generateTicTacToeMoves(),
  };
  games.push(newGame);
  res.send(`Welcome to Tic-Tac-Toe! Your game Id is ${newGameId}`);
});

function getGameId(id) {
  return games.find((game) => game.id === id);
}

function isHorizontalWin(playerMoves) {
  return ["1", "2", "3"].some(
    (number) => playerMoves.filter((move) => move.includes(number)).length >= 3
  );
}

function isVerticalWin(playerMoves) {
  return ["A", "B", "C"].some(
    (letter) => playerMoves.filter((move) => move.includes(letter)).length >= 3
  );
}

function isDiagonalWin(playerMoves) {
  return (
    ["A1", "B2", "C3"].every((move) => playerMoves.includes(move)) ||
    ["A3", "B2", "C1"].every((move) => playerMoves.includes(move))
  );
}

function isCornerWin(playerMoves) {
  return ["A1", "C1", "A3", "C3"].every((move) => playerMoves.includes(move));
}

//wapper functioon
function isWin(playerMoves) {
  return (
    isHorizontalWin(playerMoves) ||
    isVerticalWin(playerMoves) ||
    isDiagonalWin(playerMoves) ||
    isCornerWin(playerMoves)
  );
}

app.post("/games/:gameId", (req, res) => {
  const { gameId } = req.params;
  const { move } = req.body;

  const game = getGameId(gameId);

  if (!game.availableMoves.includes(move)) {
    return res.send(`${move} is not a valid move.`);
  }

  //PLAYER!
  // adding a move from player side
  game.playerXMoves.push(move);
  // removing a move in available options for the next move
  game.availableMoves = game.availableMoves.filter((m) => m !== move);


  if(isWin(game.playerXMoves)){
    return res.send('You Win...!')
  }


  if (game.availableMoves.length === 0) {
    return res.send("The game is over! Nobody wins..");
  }

  //SERVER
  const serverMove =
    game.availableMoves[Math.floor(Math.random() * game.availableMoves.length)];
  // adding a move from server side
  game.playerOMoves.push(serverMove);
  // removing a move in available options for the next move
  game.availableMoves = game.availableMoves.filter((m) => m !== serverMove);

  if(isWin(game.playerOMoves)){
    return res.send('You loose...!')
  }


  res.json(game);
});

app.listen(8080, () => console.log("Server is listing on port 8080..!!"));
