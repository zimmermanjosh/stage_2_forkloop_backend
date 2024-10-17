// Importing necessary modules

const express = require("express");
const mongoose  = require("mongoose");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;
const app = express();

// Connecting to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => console.error(err));


// const

// functions

// middleware

// routes

// main

app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
