const { Sequelize } = require("sequelize");
const DB_CONFIG = require("./db.config").config;

const sequelize = new Sequelize(DB_CONFIG.DB_NAME, DB_CONFIG.USERNAME, DB_CONFIG.PASSWORD, {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.dialect,
    operatorsAliases: false,
    pool: {
        max: DB_CONFIG.pool.max,
        min: DB_CONFIG.pool.min,
        acquire: DB_CONFIG.pool.acquire,
        idle: DB_CONFIG.pool.idle
    }
});

// Create the database object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Attach .plants to the database object and execute Plant Model, passing both Sequelize instances (connected to the database) as parameters.
db.categories = require("./categories.model.js")(sequelize, Sequelize);
/*db.plants = require("./plants.model.js")(sequelize, Sequelize);*/

// Create Associations between tables.
/*db.plants.hasOne(db.categories);*/

module.exports = db;