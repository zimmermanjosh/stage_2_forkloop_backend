const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { NotFoundError } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NotFoundError('Resource not found'));
});

module.exports = {
  userRouter,
  clothingItem
};