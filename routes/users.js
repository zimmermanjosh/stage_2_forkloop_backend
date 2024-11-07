/* eslint-disable no-console */

const router = require("express").Router();
const { createUser, getUser, getUsers } = require("../controllers/users");

router.get("/", getUser (req, res) {
console.log("GET /users")
});

router.get("/:userId", getUsers (req, res) {
console.log("GET users by ID")
});

router.post("/", createUser (req, res) {
 console.log("POST /users")
});

module.exports = router;
