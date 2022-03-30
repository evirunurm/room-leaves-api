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

// Create the database instance??
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Attach .plants to the database instance
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);