const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;
const app = express();
const auth = require("./middlewares/auth");
const {users , login} = require("./controllers/users");
const items = require("./controllers/clothingItems");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(express.json());

app.post("/signin", login);

app.post("/signup", users.createUser);
app.get("/items", items.getItems);

app.use(auth);

app.get("/users", users.getUsers);
app.get("/users/:userId", users.getUser);

app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
