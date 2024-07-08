const { register, login, getUser } = require("./auth.controller");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("./task.controller");
const { createTeam, getTeams, addMember } = require("./team.controller");

module.exports = {
  register,
  login,
  getUser,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  createTeam,
  getTeams,
  addMember,
};
