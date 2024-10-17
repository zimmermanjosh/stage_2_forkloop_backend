// Importing necessary modules

const express = require("express");

const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;
const app = express();


// const

// functions

// middleware

// routes

// main

app.listen(PORT, () => {
  console.log("Link to the server");
  console.log(BASE_PATH);
});
