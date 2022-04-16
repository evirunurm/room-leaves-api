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

// Attach table abstractions to the database object and execute each Model, passing both Sequelize instances (connected to the database) as parameters.
db.categories = require("./models/categories.model.js")(sequelize, Sequelize);
db.plants = require("./models/plants.model.js")(sequelize, Sequelize);
db.users = require("./models/users.model.js")(sequelize, Sequelize);
db.orders = require("./models/orders.model.js")(sequelize, Sequelize);
db.orderDetails = require("./models/orderDetails.model.js")(sequelize, Sequelize);

module.exports = db;