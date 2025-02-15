const router = require('express').Router()
const {getUsers, createUser, getUser, login} = require('../controllers/users');


router.post("/signin", login);
router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;