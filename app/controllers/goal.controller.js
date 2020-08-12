const Joi = require('@hapi/joi');

const validateRequest = require('../middleware/validate-request');
const goalService = require('../services/goal.services');

// Create validation Goal schema
exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    goalUserID: Joi.number().required(),
    goalGroupID: Joi.number().required(),
    description: Joi.string(),
    typeValue: Joi.string(),
    value: Joi.number(),
    active: Joi.boolean().required(),
  });

  validateRequest(req, next, schema);
};

// Admin create a Goal
exports.create = (req, res, next) => {
  goalService.create(req.body)
    .then(goal => res.json(goal))
    .catch(next);
};

// Update validation Goal schema
exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    goalGroupID: Joi.number().empty(''),
    description: Joi.string().empty(''),
    typeValue: Joi.string().empty(''),
    value: Joi.number().empty(''),
    active: Joi.boolean().empty(''),
  });

  validateRequest(req, next, schema);
}

// Admin update a Goal 
exports.update = (req, res, next) => {
  goalService.update(req.params.id, req.body)
    .then(goal => res.json(goal))
    .catch(next);
};

// Admin delete a Goal 
exports.delete = (req, res, next) => {
  goalService.delete(req.params.id)
    .then(() => res.json({ message: 'Meta excluída com sucesso!' }))
    .catch(next);
}

// Admin find all user goals
exports.findAll = (req, res, next) => {
  goalService.findAll()
    .then(goals => res.json(goals))
    .catch(next);
};

// Find the user Goal 
exports.findById = (req, res, next) => {
  goalService.findById(req.params.id)
    .then(goal => goal ? res.json(goal) : res.sendStatus(404))
    .catch(next);
};