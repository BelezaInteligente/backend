const Joi = require('@hapi/joi');

const validateRequest = require('../middleware/validate-request');
const userReportService = require('../services/userReportBI.services');

// Create validation userReportBI schema
exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    userID: Joi.number().required(),
    reportID: Joi.number().required(),    
  });

  validateRequest(req, next, schema);
};

// Admin create a userReportBI
exports.create = (req, res, next) => {
  userReportService.create(req.body)
    .then(userReportBI => res.json(userReportBI))
    .catch(next);
};

// Update validation userReportBI schema
exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    userID: Joi.number().empty(''),
    reportID: Joi.number().empty(''),
  });

  validateRequest(req, next, schema);
}

// Admin delete a userReportBI 
exports.delete = (req, res, next) => {
  userReportService.delete(req.params.id)
    .then(() => res.json({ message: 'Excluído com sucesso!' }))
    .catch(next);
}

// Admin find all user userReportBI
exports.findAll = (req, res, next) => {
  userReportService.findAll()
    .then(userReportBI => res.json(userReportBI))
    .catch(next);
};

// Find the user userReportBI 
exports.findByUserId = (req, res, next) => {
  userReportService.findByUserId(req.params.id)
    .then(userReportBI => userReportBI ? res.json(userReportBI) : res.sendStatus(404))
    .catch(next);
};