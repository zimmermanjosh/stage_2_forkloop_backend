const router = require("express").Router();
const auth = require('../middlewares/auth');

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// ##CRUD##

// CREATE
router.post("/", auth, createItem);
// READ
router.get("/", getItems);
// UPDATE
router.put("/:itemId/likes", auth, likeItem);
// DELETE
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
