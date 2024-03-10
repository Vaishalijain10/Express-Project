-------------------------------------------------
NPM PACKAGES -
-------------------------------------------------
1. npm init -y
2. npm i express
3. npm i express-handlebars
4. npm install nodemon --save-dev
  --> to start nodemon command is 
  npx nodemon src/Server.js
5. npm i handlebars
5. npm i uuid
-------------------------------------------------
Basic Strategy and Setup
-------------------------------------------------
1. //importing installed packages
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

// calling packages
const app = express();
app.use(express.json());

// for handlebars and views folder
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// listening to port 8080.
app.listen(8080, () => console.log("Server is listening on post 8080!"));

-------------------------------------------------
Rendering the Todo List
-------------------------------------------------
1. <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Todo List</title>
  </head>
  <body>
    <h1>My Todo's</h1>
    <div id="todo-list-container">
    </div>
    <div>
      <input
        id="new-todo-input"
        type="text"
        placeholder="Enter your new task here!"
      />
      <br> <br>
      <button>Add to List</button>
    </div>
  </body>
</html>
2. //importing installed packages
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

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
  res.render("index", {
    layout: false,
  });
});

// listening to port 8080.
app.listen(8080, () => console.log("Server is listening on post 8080!"));

-------------------------------------------------
Loading Todo Data into the Front-end
-------------------------------------------------
1. <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Todo List</title>
    <script>
      let todos = Json.parse(`{{{todosString}}}`); 
      console.log(todos);
    </script>
  </head>
  <body>
    <h1>My Todo's</h1>
    <div id="todo-list-container">
      {{#each todos}}
        <div id="todos-{{this.id}}">
          <h3>{{this.text}}</h3>
          {{#if this.isCompleted}}
            <p>Completed</p>
          {{/if}}
          <button>Delete</button>
          <button>Marked as Completed</button>
        </div>
      {{/each}}
    </div>
    <div style="padding-top: 20px;">
      <input
        id="new-todo-input"
        type="text"
        placeholder="Enter your new task here!"
      />
      <button>Add to List</button>
    </div>
  </body>
</html>
-------------------------------------------------
Preventing Dangerous Values
-------------------------------------------------
3. 
// to prevent dangerous text (not understandable language)
const { escapeExpression } = require("handlebars");

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
2.   <script>
      let todos = Json.parse(`{{{todosString}}}`); 
      console.log(todos);
    </script>
-------------------------------------------------
Creating New Todos
-------------------------------------------------
1. //importing installed packages
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

// listening to port 8080.
app.listen(8080, () => console.log("Server is listening on post 8080!"));
2. <html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Todo List</title>

    <script>
        let todos = JSON.parse(`{{{todosString}}}`);

        function setTodos(todos) {
            const container = document.getElementById('todo-list-container');
            container.innerHTML = '';
            for (let todo of todos) {
                const newTodoContainer = document.createElement('div');

                const newTodoHeading = document.createElement('h3');
                newTodoHeading.innerText = todo.text;
                newTodoContainer.appendChild(newTodoHeading);

                if (todo.isCompleted) {
                    const newTodoCompletedMessage = document.createElement('p');
                    newTodoHeading.innerText = 'Complete!';
                    newTodoContainer.appendChild(newTodoCompletedMessage);
                }
                const newTodoDeleteButton = document.createElement('button');
                newTodoDeleteButton.innerText = 'Delete';
                newTodoContainer.appendChild(newTodoDeleteButton);

                const newTodoCompleteButton = document.createElement('button'); 
                newTodoCompleteButton.innerText = 'Mark as Completed'; 
                newTodoContainer.appendChild (newTodoCompleteButton);

                container.appendChild(newTodoContainer);
            }
        }

        function onCreateTodo() {
            const input = document.getElementById('new-todo-input');
            const newTodoText = input.value;
            fetch('/todos', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newTodoText }),
            })
                .then(res => res.json())
                .then(newTodo => {
                    todos.push(newTodo);
                    setTodos(todos);
                    input.value = ''
                });
        }
    </script>
</head>

<body>
    <h1>My Todo's</h1>
    <div id="todo-list-container">
        {{#each todos}}
        <div id="todos-{{this.id}}">
            <h3>{{this.text}}</h3>
            {{#if this.isCompleted}}
            <p>Completed</p>
            {{/if}}
            <button>Delete</button>
            <button>Marked as Completed</button>
        </div>
        {{/each}}
    </div>
    <div style="padding-top: 20px;">
        <input id="new-todo-input" type="text" placeholder="Enter your new task here!" />
        <button onclick="onCreateTodo()">Add to List</button>
    </div>
</body>
</html>
-------------------------------------------------
 Updating Todos
-------------------------------------------------
1. <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Todo List</title>

    <script>
        let todos = JSON.parse(`{{{todosString}}}`);

        function setTodos(todos) {
            const container = document.getElementById('todo-list-container');
            container.innerHTML = '';
            for (let todo of todos) {
                const newTodoContainer = document.createElement('div');

                const newTodoHeading = document.createElement('h3');
                newTodoHeading.innerText = todo.text;
                newTodoContainer.appendChild(newTodoHeading);

                if (todo.isCompleted) {
                    const newTodoCompletedMessage = document.createElement('p');
                    newTodoCompletedMessage.innerText = 'Complete!';
                    newTodoContainer.appendChild(newTodoCompletedMessage);
                }
                const newTodoDeleteButton = document.createElement('button');
                newTodoDeleteButton.innerText = 'Delete';
                newTodoContainer.appendChild(newTodoDeleteButton);

                const newTodoCompleteButton = document.createElement('button');
                newTodoCompleteButton.innerText = 'Mark as Completed';
                newTodoCompleteButton.onclick = function () {
                    onCompleteTodo(todo.id)
                }
                newTodoContainer.appendChild(newTodoCompleteButton);
                container.appendChild(newTodoContainer);
            }
        }

        function onCreateTodo() {
            const input = document.getElementById('new-todo-input');
            const newTodoText = input.value;
            fetch('/todos', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newTodoText }),
            })
                .then(res => res.json())
                .then(newTodo => {
                    todos.push(newTodo);
                    setTodos(todos);
                    input.value = ''
                });
        }

        function onCompleteTodo(id) {
            fetch(`/todos/${id}`, { method: 'put' })
                .then(res => res.json())
                .then(updatedTodo => {
                    todos = todos.map(t => t.id === updatedTodo.id ? updatedTodo : t)
                    setTodos(todos);
                })
        }
    </script>
</head>

<body>
    <h1>My Todo's</h1>
    <div id="todo-list-container">
        {{#each todos}}
        <div id="todos-{{this.id}}">
            <h3>{{this.text}}</h3>
            {{#if this.isCompleted}}
            <p>Completed</p>
            {{/if}}
            <button>Delete</button>
            <button onclick="onCompleteTodo('{{this.id}}')">Marked as Completed</button>
        </div>
        {{/each}}
    </div>
    <div style="padding-top: 20px;">
        <input id="new-todo-input" type="text" placeholder="Enter your new task here!" />
        <button onclick="onCreateTodo()">Add to List</button>
    </div>
</body>

</html>
2. //importing installed packages
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
