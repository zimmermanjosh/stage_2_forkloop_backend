const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

mongoose.set("strictQuery", false);

const routes = require("./routes");

const { login, createUser } = require("./controllers/users");
const { validateAuth, validateUserBody } = require("./middlewares/validator");

const app = express();
const { 
  PORT = 3001, 
  BASE_PATH = "http://localhost",
  MONGODB_URI = "mongodb://127.0.0.1:27017/forkloop_db",
  NODE_ENV = "development"
} = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(express.json());
// CORS configuration with environment-based origins
const allowedOrigins = NODE_ENV === "production" 
  ? ["https://zimmermanjosh.github.io"]
  : ["https://zimmermanjosh.github.io", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Place requestLogger BEFORE all routes
app.use(requestLogger);

// Remove crash-test route in production
if (NODE_ENV !== "production") {
  app.get("/crash-test", () => {
    setTimeout(() => {
      throw new Error("Server will crash now");
    }, 0);
  });
}

app.post("/api/signin", validateAuth, login);
app.post("/api/signup", validateUserBody, createUser);

// Use centralized routes with /api prefix
app.use("/api", routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_PATH}:${PORT}`);
});
