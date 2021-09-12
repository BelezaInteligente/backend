const db = require("../models");
const UserReportBI = db.userReportBI;

module.exports = {
  create,
  delete: _delete,
  findAll,
  findByUserId,
};

async function create(params) {
  const userReportBI = new UserReportBI(params);

  await userReportBI.save();

  return basicDetails(userReportBI);
};

async function _delete(id) {
  const userReportBI = await getUserReportBI(id);
  await userReportBI.destroy();
};

async function findAll() {
  const userReportBI = await UserReportBI.findAll();
  return userReportBI.map(x => basicDetails(x));
};

async function findByUserId(id) {
  const userReportBI = await UserReportBI.findAll({
    where: {
      userID: id,
    }
  });
  return userReportBI.map(x => basicDetails(x));
};

// helper functions

function basicDetails(userReportBI) {
  const { id, userID, reportID } = userReportBI;
  return { id, userID, reportID };
};

async function getUserReportBI(id) {
  const userReportBI = await UserReportBI.findByPk(id)

  if (!userReportBI) throw 'Relacionamento não encontrado!';

  return userReportBI;
};
