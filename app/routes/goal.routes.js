module.exports = app => {

  const goalController = require("../controllers/goal.controller.js");
  const authorize = require('../middleware/authorize');
  const Role = require('../helpers/role');

  var router = require("express").Router();

  //Admin create goals
  router.post("/admin/goals/add", authorize(Role.Admin), goalController.createSchema, goalController.create);

  //Admin find all Goals
  router.get("/admin/goals", authorize(Role.Admin), goalController.findAll);

  // Admin delete the Goal with an id
  router.delete("/admin/goals/:id", authorize(Role.Admin), goalController.delete);

  //Find the user Goals with an id
  router.get("/goals/:id", authorize(), goalController.findById);

  //Update goal type and value with an id
  router.put("/goals/:id", authorize(), goalController.updateSchema, goalController.update);

  app.use("/api/v1", router);
};