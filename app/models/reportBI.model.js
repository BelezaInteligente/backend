module.exports = (sequelize, DataTypes) => {
  const ReportBI = sequelize.define('reportsBIs', {
    nameReport: DataTypes.STRING(40),
    groupBI: DataTypes.STRING(50),
    reportBI: DataTypes.STRING(50),
    active: DataTypes.BOOLEAN,
  });

  ReportBI.associate = function (models) {  
    ReportBI.belongsToMany(models.User, {through: 'usersReportsBIs', foreignKey: 'reportId', as: 'reportUsers'})
  };

  return ReportBI;
};