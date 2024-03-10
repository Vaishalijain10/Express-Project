//importing installed packages
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
// to prevent dangerous text (not understandable language)
const { escapeExpression } = require("handlebars");
// uuid to generate unique id
const { v4: uuid } = require("uuid");
// array todo's
let todos = [
  {
    id: "101",
    text: "Go to the grocery store",
    isCompleted: false,
  },
  {
    id: "102",
    text: "Exercise",
    isCompleted: false,
  },
  {
    id: "103",
    text: "Prepare Breakfast",
    isCompleted: false,
  },
];

// calling packages
const app = express();
app.use(express.json());

// for handlebars and views folder
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// creating simple end point
app.get("/", (req, res) => {
  const safeTodods = todos.map((t) => ({
    ...t,
    text: escapeExpression(t.text),
  }));
  res.render("index", {
    todos,
    todosString: JSON.stringify(todos),
    layout: false,
  });
});

app.post("/todos", (req, res) => {
  const { newTodoText } = req.body;
  const newTodo = {
    id: Math.round(Math.random(uuid())),
    text: escapeExpression(newTodoText),
    isCompleted: false,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  todo.isCompleted = true;
  res.json(todo);
});

// listening to port 8080.
app.listen(8080, () => console.log("Server is listening on post 8080!"));
