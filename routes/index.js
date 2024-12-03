const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItem);
router.use((req, res) => {
  res.status(404).send({ message: "Path Doesn't Exist" });
});

module.exports = router;
