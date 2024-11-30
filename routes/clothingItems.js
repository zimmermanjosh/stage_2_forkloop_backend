const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  updateItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// CRUD

// CREATE
router.post("/", createItem);
// read
router.get("/", getItems);
// UPDATE
router.put("/:itemId", updateItem);
router.put("/items/:itemId/likes", likeItem);
// delete

router.delete("/items/:itemId", deleteItem);

router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
