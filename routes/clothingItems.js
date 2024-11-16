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
// delete
router.delete("/:itemId", deleteItem);

router.put("/items/:itemId/likes", likeItem);

router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
