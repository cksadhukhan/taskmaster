const Joi = require("joi");

const createTeamValidation = Joi.object({
  name: Joi.string().required(),
  memberIds: Joi.array().items(Joi.number()).required(),
});

const addMemberValidation = Joi.object({
  teamId: Joi.number().required(),
  userId: Joi.number().required(),
});

module.exports = {
  createTeamValidation,
  addMemberValidation,
};
