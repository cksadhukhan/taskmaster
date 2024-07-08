const express = require("express");
const router = express.Router();
const { createTeam, getTeams, addMember } = require("../controllers");
const { auth } = require("../middlewares");

router.post("/", auth, createTeam);
router.get("/", auth, getTeams);
router.post("/addMember", auth, addMember);

module.exports = router;
