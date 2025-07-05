const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

// Custom URL validation function
const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
};

// 1. Validate clothing item body when creating an item
module.exports.validateClothingItem = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),
        weather: Joi.string().required().valid('hot', 'warm', 'cold', 'blizzard', 'sunny').messages({
            "any.only": 'Weather must be one of: hot, warm, cold, blizzard, sunny',
            "string.empty": 'The "weather" field must be filled in',
        }),
        imageUrl: Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageUrl" field must be filled in',
            "string.uri": 'The "imageUrl" field must be a valid url',
        }),
    }),
});

// 2. Validate user info body when creating a user
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

// 3. Validate authentication when user logs in
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

// 4. Validate user and clothing item IDs (24-character hex)
module.exports.validateId = celebrate({
    params: Joi.object().keys({
        itemId: Joi.string().hex().length(24).messages({
            "string.hex": 'The ID must be a valid hexadecimal value',
            "string.length": 'The ID must be exactly 24 characters long',
        }),
    }),
});

// Alternative validator for user ID params
module.exports.validateUserId = celebrate({
    params: Joi.object().keys({
        userId: Joi.string().hex().length(24).messages({
            "string.hex": 'The ID must be a valid hexadecimal value',
            "string.length": 'The ID must be exactly 24 characters long',
        }),
    }),
});

// Validate user profile updates (name and avatar only)
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