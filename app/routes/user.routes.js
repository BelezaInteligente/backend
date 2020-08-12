module.exports = app => {

  const userController = require('../controllers/user.controller.js');
  const tokenBIController = require('../controllers/tokenBI.controller.js');
  const authorize = require('../middleware/authorize');
  const Role = require('../helpers/role');

  var router = require('express').Router();

  //Admin create User
  router.post('/admin/users/add', authorize(Role.Admin), userController.createSchema, userController.create);

  //Admin find all Users
  router.get('/admin/users', authorize(Role.Admin), userController.findAll);

  //Admin update the User with an id
  router.put('/admin/users/:id', authorize(Role.Admin), userController.updateSchema, userController.update);

  //Admin delete the User with an id
  router.delete('/admin/users/:id', authorize(Role.Admin), userController.delete);

  //Find the Profile with an id
  router.get('/user/profile/:id', authorize(), userController.findById);

  //User update password with an id
  router.put('/user/profile/:id', authorize(), userController.updatePasswordSchema, userController.updatePassword);

  // PowerBI Token 
  router.get('/report/:groupId/:reportId', authorize(), tokenBIController.embedReport);

  app.use('/api/v1', router);
};