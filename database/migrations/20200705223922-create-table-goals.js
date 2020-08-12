module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('goals', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      goalUserID: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      goalGroupID: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: { model: 'groups', key: 'id' },
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      typeValue: {
        type: DataTypes.CHAR(5),
        allowNull: true,
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
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
    return queryInterface.dropTable('goals');
  }
};