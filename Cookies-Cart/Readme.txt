------------------------------------------------------------
npm packages to be installed
------------------------------------------------------------
1. npm init -y
2. npm i express
3. npm install cookie-parser
4. npm i nodemon
 - to start nodemon - command is -:
 npx nodemon src/server.js 
------------------------------------------------------------
Creating an In-Memory Cart API
------------------------------------------------------------
1. const express = require("express");

const app = express();
app.use(express.json());

// shopping cart object
let shoppingCarts = [
  {
    userId: 101,
    itemIds: ["1", "2", "3"],
  },
  {
    userId: 102,
    itemIds: ["1", "3", "5"],
  },
  {
    userId: 103,
    itemIds: ["4", "3", "2"],
  },
];

// product object
let products = [
  {
    id: "1",
    product: "shoes",
    price: "$40.00",
  },
  {
    id: "2",
    product: "Hat",
    price: "$10.00",
  },
  {
    id: "3",
    product: "Shirt",
    price: "$80.00",
  },
  {
    id: "4",
    product: "Pant",
    price: "$100.00",
  },
  {
    id: "5",
    product: "Suit",
    price: "$1500.00",
  },
];
// loading card
app.get("/users/:userId/cart", (req, res) => {
  const { userId } = req.params;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  res.json(shoppingCart.itemIds);
});

app.post("/users/:userId/cart", (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  shoppingCart.itemIds.push(itemId);
  res.sendStatus(201);
});

app.delete("/users/:userId/cart/:itemId", (req, res) => {
  const { userId, itemId } = req.params;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  shoppingCart.itemIds = shoppingCart.itemIds.filter((id) => id !== itemId);
  res.sendStatus(200);
});

app.listen(8080, () => console.log("Server is listening on port 8080"));

------------------------------------------------------------
Working with Cookies in Express and Postman
------------------------------------------------------------
1. const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// shopping cart object
let shoppingCarts = [
  {
    userId: 101,
    itemIds: ["1", "2", "3"],
  },
  {
    userId: 102,
    itemIds: ["1", "3", "5"],
  },
  {
    userId: 103,
    itemIds: ["4", "3", "2"],
  },
];

// product object
let products = [
  {
    id: "1",
    product: "shoes",
    price: "$40.00",
  },
  {
    id: "2",
    product: "Hat",
    price: "$10.00",
  },
  {
    id: "3",
    product: "Shirt",
    price: "$80.00",
  },
  {
    id: "4",
    product: "Pant",
    price: "$100.00",
  },
  {
    id: "5",
    product: "Suit",
    price: "$1500.00",
  },
];
// loading card
app.get("/users/:userId/cart", (req, res) => {
  // created cookie named card in postman and set vales as ['1','2']
  //   const cookies = req.cookies;
  //   console.log(cookies);

  const cart = JSON.parse(req.cookies.cart);
  console.log(cart);
  const { userId } = req.params;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  res.json(shoppingCart.itemIds);
});

app.post("/users/:userId/cart", (req, res) => {
  const { userId } = req.params;
  const { itemId } = req.body;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  shoppingCart.itemIds.push(itemId);
  res.sendStatus(201);
});

app.delete("/users/:userId/cart/:itemId", (req, res) => {
  const { userId, itemId } = req.params;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  shoppingCart.itemIds = shoppingCart.itemIds.filter((id) => id !== itemId);
  res.sendStatus(200);
});

app.listen(8080, () => console.log("Server is listening on port 8080"));


------------------------------------------------------------
 Loading Products and Shopping Cart Data
------------------------------------------------------------
1. const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// shopping cart object
let shoppingCarts = [
  {
    userId: 101,
    itemIds: ["1", "2", "3"],
  },
  {
    userId: 102,
    itemIds: ["1", "3", "5"],
  },
  {
    userId: 103,
    itemIds: ["4", "3", "2"],
  },
];

// product object
let products = [
  {
    id: "1",
    product: "shoes",
    price: "$40.00",
  },
  {
    id: "2",
    product: "Hat",
    price: "$10.00",
  },
  {
    id: "3",
    product: "Shirt",
    price: "$80.00",
  },
  {
    id: "4",
    product: "Pant",
    price: "$100.00",
  },
  {
    id: "5",
    product: "Suit",
    price: "$1500.00",
  },
];
// loading card
app.get("/cart", (req, res) => {
  const cartIds = JSON.parse(req.cookies.cart);
  const cartProducts = cartIds.map((id) => products.find((p) => p.id === id));
  res.json(cartProducts);
});

app.post("/cart", (req, res) => {
  const { itemId } = req.body;
  const { cart } = req.cookies;
  const updatedCardIds = [...cartIds, itemId];
  const updatedCartProducts = updatedCardIds.map((id) =>
    products.find((p) => p.id === id)
  );
  res.cookie("cart", JSON.stringify(updatedCardIds));
  res.json(updatedCartProducts);
});

app.delete("/users/:userId/cart/:itemId", (req, res) => {
  const { userId, itemId } = req.params;
  let shoppingCart = shoppingCarts.find((cart) => cart.userId == userId);
  shoppingCart.itemIds = shoppingCart.itemIds.filter((id) => id !== itemId);
  res.sendStatus(200);
});

app.listen(8080, () => console.log("Server is listening on port 8080"));

------------------------------------------------------------
 Using Middleware with Cookies
------------------------------------------------------------
1. const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// shopping cart object
let shoppingCarts = [
  {
    userId: 101,
    itemIds: ["1", "2", "3"],
  },
  {
    userId: 102,
    itemIds: ["1", "3", "5"],
  },
  {
    userId: 103,
    itemIds: ["4", "3", "2"],
  },
];

// product object
let products = [
  {
    id: "1",
    product: "shoes",
    price: "$40.00",
  },
  {
    id: "2",
    product: "Hat",
    price: "$10.00",
  },
  {
    id: "3",
    product: "Shirt",
    price: "$80.00",
  },
  {
    id: "4",
    product: "Pant",
    price: "$100.00",
  },
  {
    id: "5",
    product: "Suit",
    price: "$1500.00",
  },
];

let cartCookiesMiddleware = (req, res, next) => {
  const cartIds = JSON.parse(req.cookies.cart);
  req.cartIds = cartIds;
  next();
};

app.use(cartCookiesMiddleware);

// function
let populateItemIDs = (itemIds) => {
  return itemIds.map((id) => products.find((p) => p.id === id));
};

// loading card
app.get("/cart", (req, res) => {
  //   const cartIds = JSON.parse(req.cookies.cart);
  const cartProducts = req.cartIds.map((id) =>
    products.find((p) => p.id === id)
  );
  res.json(cartProducts);
});

app.post("/cart", (req, res) => {
  const { itemId } = req.body;
  //   const cartIds = JSON.parse(req.cookies.cart);

  const updatedCardIds = [...req.cartIds, itemId];
  //calling the function
  const updatedCartProducts = populateItemIDs(updatedCartIds);
  res.cookie("cart", JSON.stringify(updatedCardIds));
  res.json(updatedCartProducts);
});

app.delete("/cart/:itemId", (req, res) => {
  const { itemId } = req.params;
  // const cartIds = JSON.parse(req.cookies.cart);
  const updatedCartIds = req.cartIds.filter((id) => id !== itemId);
  //calling the function
  const updatedCartProducts = populateItemIDs(updatedCartIds);
  res.cookie("cart", JSON.stringify(updatedCartIds));
  res.json(updatedCartProducts);
});

app.listen(8080, () => console.log("Server is listening on port 8080"));
