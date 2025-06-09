const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const cors = require("cors");
const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
// const auth = require("./middlewares/auth");
// const {userRouter, clothingItem } = require("./routes/index.js");

const app = express();
const { PORT = 3001, BASE_PATH = "http://localhost" } = process.env;

const { ERROR_CODES, ERROR_MESSAGES } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());

// Public routes that don't need auth
app.post("/signin", login);
app.post("/signup", createUser);
app.use((req, res, next) => {
    console.log(`📍 App: ${req.method} ${req.originalUrl}`);
    next();
});
// Apply auth middleware only to protected routes
app.use("/users", routes.userRouter);
app.use("/items", routes.clothingItem);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${BASE_PATH}:${PORT}`);
});