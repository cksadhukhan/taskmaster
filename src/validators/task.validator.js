const Joi = require("joi");

const createTaskValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  teamId: Joi.number().required(),
});

const updateTaskValidation = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().optional(),
  assignedTo: Joi.number().optional(),
});

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
