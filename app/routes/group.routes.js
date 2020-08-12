module.exports = app => {

  const groupController = require("../controllers/group.controller.js");
  const authorize = require('../middleware/authorize');
  const Role = require('../helpers/role');

  var router = require("express").Router();

  //Admin create groups
  router.post("/admin/groups/add", authorize(Role.Admin), groupController.createSchema, groupController.create);

  //Find all groups
  router.get("/groups", authorize(), groupController.findAll);

  // Admin delete the group
  router.delete("/admin/groups/:id", authorize(Role.Admin), groupController.delete);

  // Admin update group
  router.put("/admin/groups/:id", authorize(Role.Admin), groupController.updateSchema, groupController.update);

  app.use('/api/v1', router);
};