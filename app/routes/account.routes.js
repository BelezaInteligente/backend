module.exports = app => {

  const accountController = require("../controllers/account.controller.js");

  var router = require("express").Router();

  //Login
  router.post("/authenticate", accountController.authenticateSchema, accountController.authenticate);

  //Forgot password
  router.post("/forgotpassword", accountController.forgotPasswordSchema, accountController.forgotPassword);

  //Reset password
  router.post("/resetpassword/:token", accountController.resetPasswordSchema, accountController.resetPassword);

  app.use('/api/v1', router);
};