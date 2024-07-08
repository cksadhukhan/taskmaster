const express = require("express");
const router = express.Router();
const { createTeam, getTeams, addMember } = require("../controllers");

router.post("/", createTeam);
router.get("/", getTeams);
router.post("/addMember", addMember);

module.exports = router;
