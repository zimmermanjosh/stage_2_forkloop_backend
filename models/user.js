const mongoose = require("mongoose");
const validator = require("validator");

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
});

module.exports = mongoose.model("user", userSchema);
