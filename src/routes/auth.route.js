const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers");

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
router.get("/me", getUser);

module.exports = router;
