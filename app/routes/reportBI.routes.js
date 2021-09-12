module.exports = app => {

  const reportController = require("../controllers/reportBI.controller.js");
  const authorize = require('../middleware/authorize');
  const Role = require('../helpers/role');

  var router = require("express").Router();

  //Admin create reportBI
  router.post("/admin/reportsBI/add", authorize(Role.Admin), reportController.createSchema, reportController.create);

  //Find all reportBI
  router.get("/admin/reportsBI", authorize(Role.Admin), reportController.findAll);

  // Admin delete the reportBI
  router.delete("/admin/reportsBI/:id", authorize(Role.Admin), reportController.delete);

  // Admin update reportBI
  router.put("/admin/reportsBI/:id", authorize(Role.Admin), reportController.updateSchema, reportController.update);

  app.use('/api/v1', router);
};