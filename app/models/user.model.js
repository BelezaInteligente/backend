module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: DataTypes.STRING(40),
    firstName: DataTypes.STRING(20),
    lastName: DataTypes.STRING(50),
    email: DataTypes.STRING(60),
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: DataTypes.CHAR(5),
    resetToken: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.hasMany(models.Goal, { as: 'goals' })
  };

  return User;
};