const express = require("express");
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
