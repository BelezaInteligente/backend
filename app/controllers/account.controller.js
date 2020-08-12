const Joi = require('@hapi/joi');

const validateRequest = require('../middleware/validate-request');
const accountService = require('../services/account.services');

// Login authenticate schema
exports.authenticateSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
};

// Login authenticate
exports.authenticate = (req, res, next) => {
  const { email, password } = req.body;
  accountService.authenticate({ email, password })
    .then(({ ...user }) => {
      res.json(user);
    })
    .catch(next);
};

// User forgot validation schema
exports.forgotPasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });

  validateRequest(req, next, schema);
}

// User forgot password
exports.forgotPassword = (req, res, next) => {
  accountService.forgotPassword(req.body.email)
    .then(() => res.json('Email enviado.'))
    .catch(next);
};

exports.resetPasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).empty(''),
  });
  validateRequest(req, next, schema);
};

exports.resetPassword = (req, res, next) => {
  accountService.resetPassword(req.params.token, req.body)
    .then(() => res.json({ message: 'Senha alterada com sucesso, você pode fazer login agora.' }))
    .catch(next);
};

exports.getEmbedToken = (req, res, next) => {
  accountService.getAccessToken(req.body)
    .then(() => accountService.getEmbedToken(req))
}
