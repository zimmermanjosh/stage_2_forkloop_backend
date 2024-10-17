// Importing necessary modules

const express = require("express");
const { getRandomQuote } = require("./utils.js");
const { PORT = 3000, BASE_PATH = "http://localhost" } = process.env;
const app = express();

//const

//functions

//middleware

//routes

//main 

app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
