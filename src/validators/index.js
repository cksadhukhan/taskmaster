const { registerValidation, loginValidation } = require("./auth.validator");
const {
  createTaskValidation,
  updateTaskValidation,
} = require("./task.validator");
const {
  createTeamValidation,
  addMemberValidation,
} = require("./team.validator");

module.exports = {
  registerValidation,
  loginValidation,
  createTaskValidation,
  updateTaskValidation,
  createTeamValidation,
  addMemberValidation,
};
