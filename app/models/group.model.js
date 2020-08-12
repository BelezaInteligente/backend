module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('groups', {
    name: DataTypes.STRING(40),
    description: DataTypes.STRING(100),
    active: DataTypes.BOOLEAN,
  });

  Group.associate = function (models) {
    Group.hasMany(models.Goal, { as: 'goals' })
  };

  return Group;
};