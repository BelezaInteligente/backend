module.exports = (sequelize, DataTypes) => {
  const UserReportBI = sequelize.define('usersReportsBIs', {
    userID: DataTypes.INTEGER(11),
    reportID: DataTypes.INTEGER(11),
  });

  UserReportBI.associate = function(models) {
    UserReportBI.belongsTo(models.User, {foreignKey: 'userID'})
    UserReportBI.belongsTo(models.ReportBI, {foreignKey: 'reportID'})
  };

  return UserReportBI;
};