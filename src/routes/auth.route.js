const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers");

router.post("/register", register);
router.post("/login", login);
router.get("/me", getUser);

module.exports = router;
