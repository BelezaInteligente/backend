module.exports = app => {

  const userReportController = require("../controllers/userReportBI.controller.js");
  const authorize = require('../middleware/authorize');
  const Role = require('../helpers/role');

  var router = require("express").Router();

  //Admin create reportBI
  router.post("/admin/userReportBI/add", authorize(Role.Admin), userReportController.createSchema, userReportController.create);

  //Find all reportBI
  router.get("/admin/userReportBI", authorize(Role.Admin), userReportController.findAll);

  //Find reportBI by userID
  router.get("/admin/userReportBI/:id", authorize(Role.Admin), userReportController.findByUserId);

  // Admin delete the reportBI
  router.delete("/admin/userReportBI/:id", authorize(Role.Admin), userReportController.delete);

  app.use('/api/v1', router);
};