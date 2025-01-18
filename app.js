/* eslint-disable no-console */
// Importing necessary modules

const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;
const app = express();

// Connecting to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6733c42413cc05a235e5feff", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use("/", indexRouter);

// Starting the server
app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
