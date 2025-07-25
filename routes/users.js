const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateUserUpdate } = require('../middlewares/validator');
const {
  getCurrentUser,
  updateUser
} = require('../controllers/users');

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;