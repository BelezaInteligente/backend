const Joi = require('@hapi/joi');

const validateRequest = require('../middleware/validate-request');
const groupService = require('../services/group.services');

// Create validation group schema
exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    active: Joi.boolean().required(),
  });

  validateRequest(req, next, schema);
};

// Admin create a group
exports.create = (req, res, next) => {
  groupService.create(req.body)
    .then(group => res.json(group))
    .catch(next);
};

// Admin update validation group schema
exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().empty(''),
    description: Joi.string().empty(''),
    active: Joi.boolean().empty(''),
  });

  validateRequest(req, next, schema);
}

// Admin update a group 
exports.update = (req, res, next) => {
  groupService.update(req.params.id, req.body)
    .then(group => res.json(group))
    .catch(next);
};

// Admin delete a group 
exports.delete = (req, res, next) => {
  groupService.delete(req.params.id)
    .then(() => res.json({ message: 'Grupo excluída com sucesso!' }))
    .catch(next);
}

// Admin find all user groups
exports.findAll = (req, res, next) => {
  groupService.findAll()
    .then(groups => res.json(groups))
    .catch(next);
};