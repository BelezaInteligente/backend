module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('goals', {
    goalUserID: DataTypes.INTEGER(11).UNSIGNED,
    goalGroupID: DataTypes.INTEGER(3),
    description: DataTypes.STRING(100),
    typeValue: DataTypes.CHAR(5),
    value: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
  });

  Goal.associate = function (models) {
    Goal.belongsTo(models.User, { foreignKey: 'goalUserID', as: 'user' });
    Goal.belongsTo(models.Group, { foreignKey: 'goalGroupID', as: 'group' });
  };

  return Goal;
};