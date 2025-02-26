// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "14d" });
    res.send({ token });
  } catch (err) {
    res
      .status(ERROR_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }
};

const handleError = (err, res) => {
  // Log the error to the console for debugging
  // console.error(err); // Log the error for debugging

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

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res));
};

const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(ERROR_CODES.CONFLICT)
        .send({ message: "Email already exists." });
    }

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
    handleError(err, res);
  }
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

module.exports = { getUsers, createUser, getUser, login };
