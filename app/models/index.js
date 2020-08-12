const dbConfig = require('../../config/database.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.group = require('./group.model.js')(sequelize, Sequelize);
db.goal = require('./goal.model.js')(sequelize, Sequelize);

module.exports = db;