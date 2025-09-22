const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  console.log("🔧 VALIDATING URL:", value);
  if (validator.isURL(value)) {
    console.log("✅ URL validation passed");
    return value;
  }
  console.log("❌ URL validation failed");
  return helpers.error("string.uri");
};

module.exports.validateRecipe = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(100).messages({
      "string.min": 'The minimum length of the "title" field is 2',
      "string.max": 'The maximum length of the "title" field is 100',
      "string.empty": 'The "title" field must be filled in',
    }),
    category: Joi.string()
      .required()
      .valid("breakfast", "lunch", "dinner", "snack")
      .messages({
        "any.only": "Category must be one of: breakfast, lunch, dinner, snack",
        "string.empty": 'The "category" field must be filled in',
      }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must be a valid url',
    }),
    cookingTime: Joi.number().optional().min(1).messages({
      "number.min": "Cooking time must be at least 1 minute",
    }),
    difficulty: Joi.string()
      .optional()
      .valid("easy", "medium", "hard")
      .messages({
        "any.only": "Difficulty must be one of: easy, medium, hard",
      }),
    servings: Joi.number().optional().min(1).messages({
      "number.min": "Servings must be at least 1",
    }),
    summary: Joi.string().optional().max(1000).messages({
      "string.max": 'The maximum length of the "summary" field is 1000',
    }),
    extendedIngredients: Joi.array().optional(),
    dishTypes: Joi.array().items(Joi.string()).optional(),
    sourceUrl: Joi.string().optional().custom(validateURL).messages({
      "string.uri": 'The "sourceUrl" field must be a valid url',
    }),
    spoonacularScore: Joi.number().optional().min(0).max(100).messages({
      "number.min": "Spoonacular score must be at least 0",
      "number.max": "Spoonacular score must be at most 100",
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    recipeId: Joi.string().hex().length(24).messages({
      "string.hex": "The ID must be a valid hexadecimal value",
      "string.length": "The ID must be exactly 24 characters long",
    }),
    userId: Joi.string().hex().length(24).messages({
      "string.hex": "The ID must be a valid hexadecimal value",
      "string.length": "The ID must be exactly 24 characters long",
    }),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.hex": "The ID must be a valid hexadecimal value",
      "string.length": "The ID must be exactly 24 characters long",
    }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid url',
    }),
  }),
});
