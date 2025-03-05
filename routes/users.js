const router = require('express').Router()
const auth = require('../middlewares/auth');
const { getUsers,
  createUser,
  getCurrentUser,
  updateUser} = require('../controllers/users');

router.post("/", createUser);
router.get("/:userId", getUsers);
router.get("/", getUsers);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;