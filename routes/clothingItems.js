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
router.put("/:itemId/likes", likeItem);
// delete

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
