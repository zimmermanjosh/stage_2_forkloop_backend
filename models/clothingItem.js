const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    max_length: 50,
    validate: {
      validator: (value) =>
        typeof value === "string" && validator.isLength(value, { min: 1 }),
      message: "Name must be a string and at least 1 character long",
    },
  },
  weather: {
    type: String,
    required: true,
    validate: {
      validator: (value) =>
        typeof value === "string" && validator.isLength(value, { min: 1 }),
      message: "Weather must be a string and at least 1 character long",
    },
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (value) => typeof value === "string" && validator.isURL(value),
      message: "Invalid URL",
    },
  },
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
