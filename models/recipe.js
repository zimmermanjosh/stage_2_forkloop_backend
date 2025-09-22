const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  category: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  cookingTime: {
    type: Number,
    required: false,
    min: 1,
  },
  difficulty: {
    type: String,
    required: false,
    enum: ["easy", "medium", "hard"],
  },
  servings: {
    type: Number,
    required: false,
    min: 1,
  },
  summary: {
    type: String,
    required: false,
    maxlength: 1000,
  },
  extendedIngredients: {
    type: Array,
    required: false,
    default: [],
  },
  dishTypes: {
    type: [String],
    required: false,
    default: [],
  },
  sourceUrl: {
    type: String,
    required: false,
    validate: {
      validator(value) {
        return !value || validator.isURL(value);
      },
      message: "Source URL must be a valid URL",
    },
  },
  spoonacularScore: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("recipe", recipeSchema);