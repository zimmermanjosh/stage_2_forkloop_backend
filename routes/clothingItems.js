const router = require("express").Router();
const auth = require('../middlewares/auth');
const ClothingItem = require("../models/clothingItem");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
// Add this at the very top, before any other routes

/// temp
// Temporary debug route - add this to your routes
router.get("/debug", (req, res) => {
  ClothingItem.find({})
      .then((items) => {
        console.log("🔍 All items in database:");
        items.forEach(item => {
          console.log(`- ID: ${item._id}, Name: ${item.name}, Owner: ${item.owner}`);
        });
        res.send({ count: items.length, items: items.map(i => ({ id: i._id, name: i.name })) });
      })
      .catch(err => res.status(500).send({ error: err.message }));
});

router.use((req, res, next) => {
  console.log(`🛣️ ClothingItems Route: ${req.method} ${req.originalUrl}`);
  console.log(`🛣️ Params:`, req.params);
  next();
});
// ##CRUD##
// Add this BEFORE your existing routes
router.delete("/:itemId", (req, res, next) => {
  console.log("🛣️ DELETE ROUTE HIT!");
  console.log("🚨 RAW DEBUGGING:");
  console.log("🚨 req.params:", req.params);
  console.log("🚨 req.url:", req.url);
  console.log("🚨 req.route:", req.route);
  console.log("🚨 req.method:", req.method);
  console.log("🛣️ Full URL:", req.originalUrl);
  console.log("🛣️ Params:", req.params);
  next(); // Continue to auth middleware
}, auth, deleteItem);
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
