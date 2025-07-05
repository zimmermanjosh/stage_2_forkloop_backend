const express = require("express");
const { errors } = require('celebrate');
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.set('strictQuery', false);

const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
const { validateAuth, validateUserBody } = require("./middlewares/validator");

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


app.post("/signin", validateAuth, login);
app.post("/signup", validateUserBody, createUser);

app.use((req, res, next) => {
    console.log(`📍 App: ${req.method} ${req.originalUrl}`);
    next();
});

app.use("/users", routes.userRouter);
app.use("/items", routes.clothingItem);

app.use(requestLogger);

// app.use(routes);

app.use(errorLogger); // enabling the error logger
app.use(errors());


app.use((req, res) => {
    res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on ${BASE_PATH}:${PORT}`);
});