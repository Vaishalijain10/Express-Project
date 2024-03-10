import express from "express";
import cookieParser from "cookie-parser";
// it will generate new id
import { v4 as uuid } from "uuid";
// created new file  'user.js'
import users from "./users.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

// creating end points - adding new users
// npm install  uuid
app.post("/users", (req, res) => {
  let { username } = req.params;

  let newUser = {
    id: uuid(),
    username,
    password,
    numberOfArticles: 0,
  };
  users.push(newUser);
  res.status(201).json(users);
});

// Read (Load) -> "List" ,"Read one" , "Search"
// search url -> http://localhost:8080/users?search=sh
app.get("/users", (req, res) => {
  let { search } = req.query;
  if (search) {
    let matches = users.filter((user) => user.username.includes(search));
    res.json(matches);
  } else {
    res.json(users);
  }
});

// Reading individual resources
// -> GET /users/123
app.get("/users/:userId", (req, res) => {
  let { userId } = req.params;
  let user = users.find((user) => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// Update
app.use("/users/:userId", (req, res) => {
  let { userId } = req.params;
  let { username, numberOfArticles } = req.body;

  let user = users.find((user) => user.id === userId);

  if (user) {
    user.username = username;
    user.numberOfArticles = numberOfArticles;
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

//Delete
app.use("/users/:userId", (req, res) => {
  let { userId } = req.params;
  let userIndex = user.findIndex((user) => user.id === userId);

  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    res.json(users);
  } else {
    res.send("Id does not exists!");
  }
});

app.listen(8080, () => console.log(`Server is listening on port 8080...!!!`));
