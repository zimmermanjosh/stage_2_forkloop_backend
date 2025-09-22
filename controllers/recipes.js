const mongoose = require("mongoose");
const Recipe = require("../models/recipe");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors/index");

const createRecipe = (req, res, next) => {
  console.log("🔧 CREATE RECIPE CONTROLLER HIT");
  console.log("🔧 Request body:", JSON.stringify(req.body, null, 2));
  console.log("🔧 User from JWT:", req.user);

  const {
    title,
    category,
    image,
    cookingTime,
    difficulty,
    servings,
    summary: rawSummary,
    extendedIngredients,
    dishTypes,
    sourceUrl,
    spoonacularScore,
  } = req.body;

  // Truncate summary to ensure it doesn't exceed MongoDB limit
  const summary = rawSummary ? rawSummary.substring(0, 1000) : undefined;

  // Fix truncated image URLs that end with just a period
  const fixImageUrl = (url) => {
    if (!url) return url;
    if (url.endsWith('.') && !url.endsWith('.jpg') && !url.endsWith('.png') && !url.endsWith('.jpeg')) {
      return url + 'jpg';
    }
    return url;
  };
  const fixedImage = fixImageUrl(image);

  const owner = req.user._id;

  console.log("🔧 Extracted fields:");
  console.log("  - title:", title);
  console.log("  - category:", category);
  console.log("  - image (original):", image);
  console.log("  - image (fixed):", fixedImage);
  console.log("  - summary length:", summary ? summary.length : "undefined");
  console.log("  - owner:", owner);

  // Manual validation for required fields
  if (!title || !category || !image) {
    console.log("❌ Missing required fields validation failed");
    return next(
      new BadRequestError("Missing required fields: title, category, image"),
    );
  }

  console.log("✅ Required fields validation passed");

  return Recipe.create({
    title,
    category,
    image: fixedImage,
    cookingTime,
    difficulty,
    servings,
    summary,
    extendedIngredients,
    dishTypes,
    sourceUrl,
    spoonacularScore,
    owner,
  })
    .then((recipe) => {
      console.log("✅ Recipe created successfully:", recipe._id);
      res.status(201).send({ data: recipe });
    })
    .catch((err) => {
      console.log("❌ Recipe creation failed:");
      console.log("  - Error name:", err.name);
      console.log("  - Error message:", err.message);
      console.log("  - Full error:", err);

      if (err.name === "ValidationError") {
        console.log("  - Validation errors:", err.errors);
        return next(new BadRequestError("Invalid data passed"));
      }
      return next(err);
    });
};

const getRecipes = (req, res, next) =>
  Recipe.find({})
    .then((recipes) => res.status(200).send({ data: recipes }))
    .catch(next);

const getUserRecipes = (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new BadRequestError("Invalid user ID format"));
  }

  return Recipe.find({ owner: userId })
    .then((recipes) => res.status(200).send({ data: recipes }))
    .catch(next);
};

const deleteRecipe = (req, res, next) => {
  console.log("🗑️ DELETE RECIPE CONTROLLER HIT!");
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    console.log("❌ Invalid ObjectId format");
    return next(new BadRequestError("Invalid ID format"));
  }

  console.log("✅ ObjectId validation passed");

  return Recipe.findById(recipeId)
    .orFail(() => {
      console.log("❌ Recipe not found in database");
      throw new NotFoundError("Recipe not found");
    })
    .then((recipe) => {
      console.log("✅ Recipe found:", recipe._id);
      console.log("🔍 Recipe owner:", recipe.owner.toString());
      console.log("🔍 Current user:", req.user._id.toString());

      // Check if the current user is the owner of the recipe
      if (recipe.owner.toString() !== req.user._id.toString()) {
        console.log("❌ User not authorized to delete");
        throw new ForbiddenError("You are not authorized to delete this recipe");
      }

      console.log("✅ Authorization passed, proceeding with deletion");

      // If user is owner, proceed with deletion
      return Recipe.findByIdAndDelete(recipeId).then((deletedRecipe) => {
        console.log("✅ Recipe deleted successfully");
        res.status(200).send({
          message: "Recipe deleted successfully",
          data: deletedRecipe,
        });
      });
    })
    .catch((err) => {
      console.log("❌ Error in deleteRecipe:", err.name, err.message);
      return next(err);
    });
};

// Like a recipe (simplified - just toggle liked status for user)
const likeRecipe = (req, res, next) => {
  const { recipeId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return next(new BadRequestError("Invalid ID format"));
  }

  return Recipe.findByIdAndUpdate(
    recipeId,
    { liked: true },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Recipe not found");
    })
    .then((recipe) => res.status(200).send({ data: recipe }))
    .catch(next);
};

// Unlike a recipe
const unlikeRecipe = (req, res, next) => {
  const { recipeId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return next(new BadRequestError("Invalid ID format"));
  }

  return Recipe.findByIdAndUpdate(
    recipeId,
    { liked: false },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Recipe not found");
    })
    .then((recipe) => res.status(200).send({ data: recipe }))
    .catch(next);
};

module.exports = {
  createRecipe,
  getRecipes,
  getUserRecipes,
  deleteRecipe,
  likeRecipe,
  unlikeRecipe,
};