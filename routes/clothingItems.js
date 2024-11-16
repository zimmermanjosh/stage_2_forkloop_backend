const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

// CRUD
// CREATE
router.post("/", createItem);
// read
router.get("/", getItems);
// delete
router.delete("/:itemId", deleteItem);

module.exports = router;
