const router = require('express').Router()
const {getUsers, createUser} = require('../controllers/users');

router.post("/", createUser);
router.get("/:userId", getUsers);
router.get("/", getUsers);


module.exports = router;