const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require('../utils/errors');

// ... existing code

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    max_length: 30,
    validate: {
      validator(value) {
        const regex = /^[A-Za-z]+$/; // Only letters
        return (
          regex.test(value) &&
          !validator.isNumeric(value.charAt(0)) &&
          !validator.isNumeric(value.charAt(value.length - 1))
        );
      },
      message:
        "Name must only contain letters, no digits, and cannot start or end with a digit.",
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Incorrect email or password"),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Incorrect email or password"),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
