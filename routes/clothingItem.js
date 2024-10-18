const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
} = require("../controllers/clothingItem");

// CRUD

// CREATE
router.post("/", createItem);

// read
router.get("/", getItems);

// update
router.put("/:itemId", updateItem);

// delete

module.exports = router;
