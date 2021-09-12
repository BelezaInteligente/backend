const db = require("../models");
const ReportBI = db.reportBI;

module.exports = {
  create,
  update,
  delete: _delete,
  findAll,
};

async function create(params) {
  // validate
  if (await ReportBI.findOne({
    where: { nameReport: params.nameReport }
  })) {
    throw 'Nome do relatório "' + params.nameReport + '" já utilizado.';
  }
  
  const reportBI = new ReportBI(params);

  await reportBI.save();

  return basicDetails(reportBI);
};

async function update(id, params) {
  const reportBI = await getReportBI(id);

  Object.assign(reportBI, params);
  await reportBI.save();

  return basicDetails(reportBI);
};

async function _delete(id) {
  const reportBI = await getReportBI(id);
  await reportBI.destroy();
};

async function findAll() {
  const reportBI = await ReportBI.findAll();
  return reportBI.map(x => basicDetails(x));
};

// helper functions

function basicDetails(reportBIs) {
  const { id, nameReport, groupBI, reportBI, active } = reportBIs;
  return { id, nameReport, groupBI, reportBI, active };
};

async function getReportBI(id) {
  const reportBI = await ReportBI.findByPk(id)

  if (!reportBI) throw 'Relatório BI, não econtrado!';

  return reportBI;
};
