const router = require("express").Router();
const auth = require('../middlewares/auth');
const { validateClothingItem, validateId } = require('../middlewares/validator');

const {
    createItem,
    getItems,
    deleteItem,
    likeItem,
    dislikeItem,
} = require("../controllers/clothingItems");


router.post("/", auth, validateClothingItem, createItem); // Validate clothing item data
router.get("/", getItems); // No validation needed for getting all items
router.delete("/:itemId", auth, validateId, deleteItem); // Validate itemId parameter
router.put("/:itemId/likes", auth, validateId, likeItem); // Validate itemId parameter
router.delete("/:itemId/likes", auth, validateId, dislikeItem); // Validate itemId parameter

module.exports = router;