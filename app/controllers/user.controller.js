const Joi = require('@hapi/joi');

const Role = require('../helpers/role');
const validateRequest = require('../middleware/validate-request');
const userService = require('../services/user.services');
const goalService = require('../services/goal.services');
const config = require('../../config/default.config.js');

// Create validation User schema
exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    active: Joi.boolean().required(),
    role: Joi.string().valid(Role.Admin, Role.User).empty('').required()
  });

  validateRequest(req, next, schema);
};

// Admin create a User
exports.create = (req, res, next) => {
  req.body.password = config.defaultPassword;

  userService.create(req.body)
    .then(user => res.json(user))
    .catch(next);
};

// Update validation User schema
exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
    password: Joi.string().min(6).empty(''),
    confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
    role: Joi.string().valid(Role.Admin, Role.User).empty(''),
    active: Joi.boolean().empty(''),
  });

  validateRequest(req, next, schema);
};

// Admin update a User 
exports.update = (req, res, next) => {
  userService.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next);
};

// User update validation Password schema
exports.updatePasswordSchema = (req, res, next) => {
  const schemaPassword = {
    password: Joi.string().min(6).empty(''),
    confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
  };

  const schema = Joi.object(schemaPassword).with('password', 'confirmPassword');
  validateRequest(req, next, schema);
};

// User update password
exports.updatePassword = (req, res, next) => {
  userService.updatePassword(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next);
};

// Admin delete a User 
exports.delete = (req, res, next) => {

  goalService.deleteAllGoals(req.params.id)
    .then(() => userService.delete(req.params.id)
      .then(() => res.json({ message: 'Usuário excluído com sucesso!' }))
      .catch(next))
    .catch(next);
};

// Admin find all users
exports.findAll = (req, res, next) => {
  userService.findAll()
    .then(users => res.json(users))
    .catch(next);
};

// Find the user Profile
exports.findById = (req, res, next) => {
  userService.findById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(next);
};
