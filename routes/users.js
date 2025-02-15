const router = require('express').Router()
const {getUsers, login} = require('../controllers/users');


router.post("/signin", login);
router.get("/", getUsers);


module.exports = router;