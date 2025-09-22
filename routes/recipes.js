const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateRecipe,
  validateId,
} = require("../middlewares/validator");

const {
  createRecipe,
  getRecipes,
  getUserRecipes,
  deleteRecipe,
  likeRecipe,
  unlikeRecipe,
} = require("../controllers/recipes");

router.post("/", auth, validateRecipe, createRecipe); // Create new recipe in user's collection
router.get("/", getRecipes); // Get all recipes
router.get("/user/:userId", validateId, getUserRecipes); // Get recipes by specific user
router.delete("/:recipeId", auth, validateId, deleteRecipe); // Delete recipe from collection
router.put("/:recipeId/likes", auth, validateId, likeRecipe); // Like recipe
router.delete("/:recipeId/likes", auth, validateId, unlikeRecipe); // Unlike recipe

module.exports = router;