module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('groups', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('groups');
  }
};