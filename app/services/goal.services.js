const db = require("../models");
const Goal = db.goal;

module.exports = {
  create,
  update,
  delete: _delete,
  deleteAllGoals,
  findAll,
  findById,
};

async function create(params) {
  const goal = new Goal(params);

  await goal.save();

  return basicDetails(goal);
};

async function update(id, params) {
  const goal = await getGoal(id);

  Object.assign(goal, params);
  await goal.save();

  return basicDetails(goal);
};

async function _delete(id) {
  const goal = await getGoal(id);
  await goal.destroy();
};

async function deleteAllGoals(id) {
  await Goal.destroy({
    where: {
      goalUserID: id,
    }
  });
};

async function findAll() {
  const goal = await Goal.findAll();
  return goal.map(x => basicDetails(x));
};

async function findById(id) {
  const goal = await Goal.findAll({
    where: {
      goalUserID: id,
    }
  });
  return goal.map(x => basicDetails(x));
};

// helper functions

function basicDetails(goal) {
  const { id, goalUserID, goalGroupID, description, typeValue, value, active } = goal;
  return { id, goalUserID, goalGroupID, description, typeValue, value, active };
};

async function getGoal(id) {
  const goal = await Goal.findByPk(id)

  if (!goal) throw 'Meta não econtrada!';

  return goal;
};
