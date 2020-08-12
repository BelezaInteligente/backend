const db = require("../models");
const Group = db.group;

module.exports = {
  create,
  update,
  delete: _delete,
  findAll,
};

async function create(params) {
  const group = new Group(params);

  await group.save();

  return basicDetails(group);
};

async function update(id, params) {
  const group = await getGroup(id);

  Object.assign(group, params);
  await group.save();

  return basicDetails(group);
};

async function _delete(id) {
  const group = await getGroup(id);
  await group.destroy();
};

async function findAll() {
  const group = await Group.findAll();
  return group.map(x => basicDetails(x));
};

// helper functions

function basicDetails(group) {
  const { id, name, description, active } = group;
  return { id, name, description, active };
};

async function getGroup(id) {
  const group = await Group.findByPk(id)

  if (!group) throw 'Grupo não econtrada!';

  return group;
};
