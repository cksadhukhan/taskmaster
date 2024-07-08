const prisma = require("../models");
const { createTeamValidation, addMemberValidation } = require("../validators");

// Create a team
exports.createTeam = async (req, res) => {
  const { error } = createTeamValidation.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, memberIds } = req.body;
  try {
    const team = await prisma.team.create({
      data: {
        name,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
    });
    res.json(team);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get teams for the user
exports.getTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      where: { members: { some: { id: req.user.id } } },
    });
    res.json(teams);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Add a member to the team
exports.addMember = async (req, res) => {
  const { error } = addMemberValidation.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { teamId, userId } = req.body;
  try {
    const team = await prisma.team.findUnique({
      where: { id: parseInt(teamId) },
    });
    if (!team) return res.status(404).json({ msg: "Team not found" });

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const updatedTeam = await prisma.team.update({
      where: { id: team.id },
      data: {
        members: {
          connect: { id: user.id },
        },
      },
    });

    res.json(updatedTeam);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
