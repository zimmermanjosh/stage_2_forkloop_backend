const router = require('express').Router()
const { getUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateUser} = require('../controllers/users');

router.post("/", createUser);
router.get("/:userId", getUsers);
router.get("/", getUsers);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;