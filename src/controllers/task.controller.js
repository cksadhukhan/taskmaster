const prisma = require("../models");
const { createTaskValidation, updateTaskValidation } = require("../validators");

// Create a task
exports.createTask = async (req, res) => {
  const { error } = createTaskValidation.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { title, description, dueDate, teamId } = req.body;
  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    });

    if (!team) return res.status(404).json({ msg: "Team not found" });

    if (!team.members.some((member) => member.id === req.user.id)) {
      return res.status(403).json({ msg: "User is not a member of the team" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        ownerId: req.user.id,
        teamId,
      },
    });

    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get tasks assigned to the user or by the user in the team
exports.getTasks = async (req, res) => {
  const { teamId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        teamId: parseInt(teamId),
        OR: [{ ownerId: req.user.id }, { assignedTo: { id: req.user.id } }],
      },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { error } = updateTaskValidation.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { title, description, dueDate, status, assignedTo } = req.body;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { team: { include: { members: true } } },
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (
      task.ownerId !== req.user.id &&
      !task.team.members.some((member) => member.id === req.user.id)
    ) {
      return res
        .status(403)
        .json({ msg: "User is not authorized to update this task" });
    }

    if (assignedTo) {
      const user = await prisma.user.findUnique({ where: { id: assignedTo } });
      if (!user)
        return res.status(404).json({ msg: "Assigned user not found" });

      if (!task.team.members.some((member) => member.id === user.id)) {
        return res
          .status(403)
          .json({ msg: "Assigned user is not a member of the team" });
      }
    }

    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status,
        userId: assignedTo,
      },
    });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.ownerId !== req.user.id)
      return res
        .status(403)
        .json({ msg: "User is not authorized to delete this task" });

    await prisma.task.delete({ where: { id: task.id } });

    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
