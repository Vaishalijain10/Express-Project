// rendering templates

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
