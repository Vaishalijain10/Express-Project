-----------------------------------
NPM PACKAGES
-----------------------------------
1. npm init --y
2. npm i express
3. npm i nodemon
4. npm i uuid
--------------------------------------------
Basic Game Flow and Implementation Strategy
---------------------------------------------
1.const express = require("express");
const app = express();
app.use(express.json);
app.post("/games", (req, res) => {   
});
app.post("/games/:gameId", (req, res) => {
});
app.listen(8080, () => console.log("Server is listing on port 8080..!!"));

-----------------------------------
 Creating New Games
-----------------------------------
1. const express = require("express");
const {v4: uuid } = require("uuid");

let games = [
  {
    id: "101",
    playerXMoves: [],
    playerYMoves: [],
  },
];

const app = express();
app.use(express.json());

app.post("/games", (req, res) => {
  const newGameId = uuid();
  const newGame = {
    id: newGameId,
    playerXMoves: [],
    playerYMoves: [],
  };
  games.push(newGame);
  res.send(`Welcome to Tic-Tac-Toe! Your game Id is ${newGameId}`);
});

app.post("/games/:gameId", (req, res) => {});

app.listen(8080, () => console.log("Server is listing on port 8080..!!"));

-----------------------------------
 Accepting Player Input
-----------------------------------
1. ROWS - 1,2,3 AND COLUMN - A,B,C
2. const express = require("express");
const { v4: uuid } = require("uuid");

let games = [
  {
    id: "101",
    playerXMoves: [],
    playerYMoves: [],
  },
];

const app = express();
app.use(express.json());

app.post("/games", (req, res) => {
  const newGameId = uuid();
  const newGame = {
    id: newGameId,
    playerXMoves: [],
    playerYMoves: [],
  };
  games.push(newGame);
  res.send(`Welcome to Tic-Tac-Toe! Your game Id is ${newGameId}`);
});

function getGameId(id) {
  return games.find((game) => game.id === id);
}

app.post("/games/:gameId", (req, res) => {
  const { gameId } = req.params;
  const { move } = req.body;

  const game = getGameId(gameId);
  game.playerXMoves.push(move);

  res.json(game);
});

app.listen(8080, () => console.log("Server is listing on port 8080..!!"));

-----------------------------------------------
Generating Computer Moves and Validating Input
-----------------------------------------------
1.
2.
-----------------------------------
Calculating Ties and Wins
-----------------------------------
1.
2.
--------------------------------------
Calculating Diagonal and Corner Wins
--------------------------------------
1.
2.



