/* eslint-disable no-console */
// Importing necessary modules

const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;
const app = express();
const auth = require("./middlewares/auth");
const users = require("./controllers/users");
const items = require("./controllers/clothingItems");

// const cors = require("cors");

// app.use(cors());

// Connecting to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());

app.post("/signin", users.login);
app.post("/signup", users.createUser);
app.get("/items", items.getItems);

app.use(auth); // Protect all routes below this line

app.get("/users", users.getUsers);
app.get("/users/:userId", users.getUser);

// Starting the server
app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
