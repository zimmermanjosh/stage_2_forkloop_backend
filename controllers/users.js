const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require("../utils/config");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError
} = require("../utils/errors/index");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError('Email and password are required'));
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

    return res.send({ token });
  } catch (err) {
    if (err.statusCode === 401) {
      return next(new UnauthorizedError('Incorrect email or password'));
    }
    return next(err); // Pass any other errors to error handler
  }
};

const createUser = async (req, res, next) => {
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

    return res.status(201).send(userWithoutPassword);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Email already exists'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Invalid data passed'));
    }
    return next(err); // Pass any other errors to error handler
  }
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true, runValidators: true }
  )
      .orFail(() => {
        throw new NotFoundError('User not found');
      })
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === "ValidationError") {
          return next(new BadRequestError('Invalid data passed'));
        }
        if (err.name === "CastError") {
          return next(new BadRequestError('Invalid ID format'));
        }
        return next(err);
      });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
      .orFail(() => {
        throw new NotFoundError('User not found');
      })
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === "CastError") {
          return next(new BadRequestError('Invalid ID format'));
        }
        return next(err);
      });
};

module.exports = { createUser, login, updateUser, getCurrentUser };