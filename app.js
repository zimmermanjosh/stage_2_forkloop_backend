/* eslint-disable no-console */
// Importing necessary modules

const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;
const app = express();

const routes = require("./routes");

// Connecting to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());
app.use("/", indexRouter);
app.use(routes);

app.post("/clothing", (req, res) => {
  console.log(req.user._id); // _id will become accessible
  res.send("Testing createClothingItem");
});

app.use((req, res, next) => {
  req.user = {
    _id: "6733c42413cc05a235e5feff", // paste the _id of the test user created in the previous step
  };
  next();
});

// Starting the server
app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
