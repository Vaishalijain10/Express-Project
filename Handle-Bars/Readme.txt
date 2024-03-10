-------------------------------
What are Templating Engines
-------------------------------
1. reusing html files and display different data!
2. ways to display data
- <h3> vaishali </h3>
- manipulating text using js , leaving elements  empty in html structure and use fetch function to display
- by handling bars
3. views folder -> files of handlebars
4. hbs -> short form of handlebars



-------------------------------------------
Rendering Handlebars Templates in Express
-------------------------------------------
1. {{! hbs - short from of handlebars }}
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{PageTitle}}</title>
  </head>
  <body>
    <h1>{{mainHeading}}</h1>
  </body>
</html>
2. // rendering templates

// importing express package
const express = require("express");
// importing handlebars
const { engine } = require("express-handlebars");
// importing path module
const path = require("path");

// calling express
const app = express();

// rendering engine function
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    layout: false,
    PageTitle: "My First Handlebars Page",
    mainHeading: "Hello From Handlebars!",
  });
});

app.get("/products", (req, res) => {
  res.render("index", {
    layout: false,
    PageTitle: "Products",
    mainHeading: "All Products",
  });
});

// listening server
app.listen(8080, () => console.log("Server is listening on port 8080!!"));


-------------------------------------------
User-Profile Template Example
-------------------------------------------
1. <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Profile</title>
  </head>
  <body>
    <h3 id="user-name">{{name}}</h3>
    <p id="user-age">{{age}}</p>
    <p id="user-hair-color">{{HairColor}}</p>
  </body>
</html>
2. // rendering templates

// importing express package
const express = require("express");
// importing handlebars
const { engine } = require("express-handlebars");
// importing path module
const path = require("path");

// calling express
const app = express();

// rendering engine function
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    layout: false,
    PageTitle: "My First Handlebars Page",
    mainHeading: "Hello From Handlebars!",
  });
});

// url -> http://localhost:8080/user-1
app.get("/user-1", (req, res) => {
  res.render("user-profile", {
    layout: false,
    name: "Vaishali",
    age: "22",
    HairColor: "Brown",
  });
});

app.get("/user-2", (req, res) => {
  res.render("user-profile", {
    layout: false,
    name: "Kalpesh",
    age: "22",
    HairColor: "Brown",
  });
});

app.get("/user-3", (req, res) => {
  res.render("user-profile", {
    layout: false,
    name: "Yogita",
    age: "22",
    HairColor: "Brown",
  });
});

// listening server
app.listen(8080, () => console.log("Server is listening on port 8080!!"));


---------------------------------------------------------------------------------------------------------------
Combining URL and Query Parameters with Templates
------------------------------------------------------------------------------------------------------------------------
1. <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Profile</title>
  </head>
  <body>
    {{!-- WAY -1 --}}
    {{!-- <h3 id="user-name">{{name}}</h3>
    <p id="user-age">{{age}}</p>
    <p id="user-hair-color">{{HairColor}}</p> --}}
    
    {{!-- WAY-2 --}}
    <h3 id="user-name">{{user.name}}</h3>
    <p id="user-age">{{user.age}}</p>
    <p id="user-hair-color">{{user.HairColor}}</p>
  </body>
</html>
2. <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Products</title>
  </head>
  <body>
    {{!-- helps in rendering --}}
    <p>{{productsNames}}</p>
  </body>
</html>
3. // rendering templates

// importing express package
const express = require("express");
// importing handlebars
const { engine } = require("express-handlebars");
// importing path module
const path = require("path");

// calling express
const app = express();

// rendering engine function
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    layout: false,
    PageTitle: "My First Handlebars Page",
    mainHeading: "Hello From Handlebars!",
  });
});

// Object users!
let users = [
  {
    id: "1",
    name: "Vaishali",
    age: "22",
    HairColor: "Brown",
  },
  {
    id: "2",
    name: "Kalpesh",
    age: "22",
    HairColor: "Brown",
  },
  {
    id: "3",
    name: "Yogita",
    age: "22",
    HairColor: "Brown",
  },
];

// URL-> http://localhost:8080/users/2
// used query parameters
app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === userId);
  res.render("user-profile", {
    layout: false,
    // WAY-1
    // name: user.name,
    // age: user.age,
    // HairColor: user.HairColor,

    //WAY-2
    user,
  });
});

let products = [
  {
    name: "shoes",
    price: "1000",
  },
  {
    name: "Socks",
    price: "100",
  },
  {
    name: "Shirt",
    price: "700",
  },
  {
    name: "Pant",
    price: "1700",
  },
];

// URL - http://localhost:8080/products?price=1700
app.get("/products", (req, res) => {
  const { name, price } = req.query;
  let responseProducts = products;
  if (name) {
    responseProducts = responseProducts.filter((p) => p.name.includes(name));
  }

  if (price) {
    responseProducts = responseProducts.filter((p) => p.price < Number(price));
  }

  res.render("products", {
    layout: false,
    productsNames: responseProducts.map((p) => p.name).join(","),
  });
});

// listening server
app.listen(8080, () => console.log("Server is listening on port 8080!!"));

------------------------------------------------------------------------------------------------------------------------
 The Handlebars If and Each Helpers
------------------------------------------------------------------------------------------------------------------------
1.<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Profile</title>
  </head>
  <body>
    {{! WAY -1 }}
    {{!-- <h3 id="user-name">{{name}}</h3>
    <p id="user-age">{{age}}</p>
    <p id="user-hair-color">{{HairColor}}</p> --}}

    {{! WAY-2 }}
    <h3>Name : {{user.name}}</h3>
    {{! opening if }}
    {{#if user.age}}
      <p>Age : {{user.age}}</p>
      {{! closing if }}
    {{/if}}
    <p>Hair Color : {{user.HairColor}}</p>
  </body>
</html>
2. <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Profile</title>
  </head>
  <body>
    {{! opening each }}
    {{#each users}}
      <h3>Name : {{this.name}}</h3>
      {{#if this.age}}
        <p>Age : {{this.age}}</p>
      {{/if}}
      <p>Hair Color : {{this.HairColor}}</p>
      {{! closing each }}
    {{/each}}
  </body>
</html>
3. // rendering templates

// importing express package
const express = require("express");
// importing handlebars
const { engine } = require("express-handlebars");
// importing path module
const path = require("path");

// calling express
const app = express();

// rendering engine function
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    layout: false,
    PageTitle: "My First Handlebars Page",
    mainHeading: "Hello From Handlebars!",
  });
});

// Object users!
let users = [
  {
    // age is removed here, to  test the {{if}} in hbs- to show / hide
    id: "1",
    name: "Vaishali",
    HairColor: "Brown",
  },
  {
    id: "2",
    name: "Kalpesh",
    age: "22",
    HairColor: "Brown",
  },
  {
    id: "3",
    name: "Yogita",
    age: "22",
    HairColor: "Brown",
  },
];

app.get("/users", (req, res) => {
  res.render("users-list", {
    layout: false,
    users,
  });
});

// URL-> http://localhost:8080/users/2
// used query parameters
app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === userId);
  res.render("user-profile", {
    layout: false,
    // WAY-1
    // name: user.name,
    // age: user.age,
    // HairColor: user.HairColor,

    //WAY-2
    user,
  });
});

let products = [
  {
    name: "shoes",
    price: "1000",
  },
  {
    name: "Socks",
    price: "100",
  },
  {
    name: "Shirt",
    price: "700",
  },
  {
    name: "Pant",
    price: "1700",
  },
];

// URL - http://localhost:8080/products?price=1700
app.get("/products", (req, res) => {
  const { name, price } = req.query;
  let responseProducts = products;
  if (name) {
    responseProducts = responseProducts.filter((p) => p.name.includes(name));
  }

  if (price) {
    responseProducts = responseProducts.filter((p) => p.price < Number(price));
  }

  res.render("products", {
    layout: false,
    productsNames: responseProducts.map((p) => p.name).join(","),
  });
});

// listening server
app.listen(8080, () => console.log("Server is listening on port 8080!!"));












