const expressJwt = require('express-jwt');
const config = require('../../config/default.config.js');
const db = require('../models');
const User = db.user;

module.exports = authorize;

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  };

  const secret = config.secret;

  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret, algorithms: ['HS256'] }),

    async (req, res, next) => {
      const user = await User.findByPk(req.user.id);
      const token = req.headers.authorization || req.cookies.auth

      if (!token) {
        return res.status(403).json({ message: 'Token não informado!' });
      }

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json({ message: 'Não autorizado!' });
      }

      // authentication and authorization successful
      req.user.role = user.role;
      req.user.accessToken = token;
      next();
    }
  ];
};