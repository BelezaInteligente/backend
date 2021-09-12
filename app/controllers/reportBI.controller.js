const Joi = require('@hapi/joi');

const validateRequest = require('../middleware/validate-request');
const reportService = require('../services/reportBI.services');

// Create validation reportBI schema
exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    nameReport: Joi.string().required(),
    groupBI: Joi.string().required(),
    reportBI: Joi.string().required(),        
    active: Joi.boolean().required(),
  });

  validateRequest(req, next, schema);
};

// Admin create a reportBI
exports.create = (req, res, next) => {
  reportService.create(req.body)
    .then(reportBI => res.json(reportBI))
    .catch(next);
};

// Update validation reportBI schema
exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    nameReport: Joi.string().empty(''),
    groupBI: Joi.string().empty(''),
    reportBI: Joi.string().empty(''),
    active: Joi.boolean().empty(''),
  });

  validateRequest(req, next, schema);
}

// Admin update a reportBI 
exports.update = (req, res, next) => {
  reportService.update(req.params.id, req.body)
    .then(reportBI => res.json(reportBI))
    .catch(next);
};

// Admin delete a reportBI 
exports.delete = (req, res, next) => {
  reportService.delete(req.params.id)
    .then(() => res.json({ message: 'Relatório BI, excluído com sucesso!' }))
    .catch(next);
}

// Admin find all reportBI
exports.findAll = (req, res, next) => {
  reportService.findAll()
    .then(reportsBI => res.json(reportsBI))
    .catch(next);
};