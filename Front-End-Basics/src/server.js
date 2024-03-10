// importing installed packages
const express = require("express");
const path = require("path");

// calling the packages that are imported
const app = express();
app.use(express.json());
// OBJECT -
const users = [
  {
    id: "101",
    name: "Vaishali",
  },
  {
    id: "102",
    name: "Kalpesh",
  },
  {
    id: "103",
    name: "Vinay",
  },
  {
    id: "105",
    name: "Yogita",
  },
  {
    id: "106",
    name: "Soumitra",
  },
];

// linking index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

//
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  users.push({ id: "1001", name });
  res.json(users);
});

// starting the server.
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
