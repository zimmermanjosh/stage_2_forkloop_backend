const router = require("express").Router();
const userRouter = require("./users");
const recipeRouter = require("./recipes");
const { NotFoundError } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

// Handle unknown routes
router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

// Export the main router (not an object)
module.exports = router;
