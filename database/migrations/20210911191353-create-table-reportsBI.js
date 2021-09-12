module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('reportsBIs', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nameReport: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      groupBI: {
        type: DataTypes.STRING(50),
        allowNull: false,        
      },
      reportBI: {
        type: DataTypes.STRING(50),
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
    return queryInterface.dropTable('reportsBIs');
  }
};