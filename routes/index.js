const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/util");

router.use("/users", userRouter);
router.use("/items", clothingItem);
router.use((req, res) =>
  res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND })
);

module.exports = router;
