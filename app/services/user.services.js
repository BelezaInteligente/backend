const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;

module.exports = {
  create,
  update,
  updatePassword,
  delete: _delete,
  findAll,
  findById,
};

async function create(params) {
  // validate
  if (await User.findOne({
    where: { name: params.name }
  })) {
    throw 'Nome do usuário "' + params.name + '" já utilizado.';
  }

  if (await User.findOne({
    where: { email: params.email }
  })) {
    throw 'Email "' + params.email + '" já utilizado.';
  }

  const user = new User(params);

  if (params.password) {
    user.password = hash(params.password);
  }

  await user.save();

  return basicDetails(user);
};

async function update(id, params) {
  const user = await getUser(id);

  // validate
  if (params.email !== undefined && user.email !== params.email &&
    await User.findOne({
      where: { email: params.email }
    })) {
    throw 'Email "' + params.email + '" já utilizado.';
  }

  if (params.name !== undefined && user.name !== params.name &&
    await User.findOne({
      where: { name: params.name }
    })) {
    throw 'Nome do usuário "' + params.name + '" já utilizado.';
  }

  Object.assign(user, params);
  await user.save();

  return basicDetails(user);
};

async function updatePassword(id, params) {
  const user = await getUser(id);

  if (params.password) {
    params.password = hash(params.password);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return profileDetails(user);
};

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
};

async function findAll() {
  const user = await User.findAll();

  return user.map(x => basicDetails(x));
};

async function findById(id) {
  const user = await getUser(id);
  return basicDetails(user);
};

// helper functions

function basicDetails(user) {
  const { id, name, firstName, lastName, email, role, active, resetToken } = user;
  return { id, name, firstName, lastName, email, role, active, resetToken };
};

function profileDetails(user) {
  const { id, name, email } = user;
  return { id, name, email };
};

function hash(password) {
  return bcrypt.hashSync(password, 10);
};

async function getUser(id) {
  const user = await User.findByPk(id)

  if (!user) throw 'Usuário não econtrado!';

  return user;
};
