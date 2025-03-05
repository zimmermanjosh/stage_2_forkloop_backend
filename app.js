const express = require("express");
const mongoose = require("mongoose");

const { ERROR_CODES, ERROR_MESSAGES } = require("./utils/errors");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;

const app = express();

const auth = require("./middlewares/auth");
const { getUsers, createUser, getUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db") // # 27017
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));

app.use(express.json());

app.post("/signin", login);

app.post("/signup", createUser);

app.get("/items", getItems);

app.use(auth);

app.get("/users", getUsers);

app.get("/users/:userId", getUser);
app.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Link to the server");
  // eslint-disable-next-line no-console
  console.log(BASE_PATH);
});
