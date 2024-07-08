const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers");
const { auth } = require("../middlewares");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getUser);

module.exports = router;
