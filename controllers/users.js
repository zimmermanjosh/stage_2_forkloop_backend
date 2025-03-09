const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { JWT_EXPIRATION_TIME } = require("../utils/config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(ERROR_CODES.BAD_REQUEST)
        .send({ message: ERROR_MESSAGES.BAD_REQUEST });
    }
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
    res.send({ token });
  } catch (err) {
    // res.status(ERROR_CODES.UNAUTHORIZED).send({ message: ERROR_MESSAGES.UNAUTHORIZED });
    if (err.statusCode === 401) {
      return res
        .status(ERROR_CODES.UNAUTHORIZED)
        .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }
      // Default server error
      return res
      .status(ERROR_CODES.SERVER_ERROR)
      .send({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
  // Explicitly return undefined to satisfy ESLint
  return res;
};

const handleError = (err, res) => {
  if (err.name === "ValidationError") {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  if (err.name === "DocumentNotFoundError") {
    return res
      .status(ERROR_CODES.NOT_FOUND)
      .send({ message: ERROR_MESSAGES.NOT_FOUND });
  }
  if (err.code === 409) {
    return res
      .status(ERROR_CODES.CONFLICT)
      .send({ message: "Email already exists." });
  }
  // Default server error
  return res
    .status(ERROR_CODES.SERVER_ERROR)
    .send({ message: ERROR_MESSAGES.SERVER_ERROR });
};

const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
    res.status(ERROR_CODES.CREATED).send(userWithoutPassword);
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error (email already exists)
      return res.status(ERROR_CODES.CONFLICT).send({ message: ERROR_MESSAGES.CONFLICT });
    }

    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODES.BAD_REQUEST).send({ message: ERROR_MESSAGES.BAD_REQUEST });
    }

    return res.status(ERROR_CODES.SERVER_ERROR).send({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
    // Explicitly return undefined to satisfy ESLint
  return res;
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid ID format." });
      }
      return handleError(err, res);
    });
};
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.BAD_REQUEST });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid ID format." });
      }
      return handleError(err, res);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid ID format." });
      }
      return handleError(err, res);
    });
};


module.exports = { createUser, getUser, login, updateUser, getCurrentUser };
