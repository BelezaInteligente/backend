module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('usersReportsBIs', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {         // User hasMany ReportsBI n:n
          model: 'users',
          key: 'id'
        }
      },
      reportId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {         // ReportsBI hasMany Users n:n
          model: 'reportsBIs',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('usersReportsBIs');
  }
};