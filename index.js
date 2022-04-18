const express = require("express");
const cors = require("cors");

// Constants
const PORT = process.env.PORT || 80;


// Create express Main application
const app = express();

// Common express middleware
// Each middleware is triggered for every single request.
// Parsing incoming data.
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Cors enabled for *. From development only.
app.use(cors())

// Sync database with server
const db = require("./app/db");

try {
    db.sequelize.sync(/*{force:true}*/);
} catch (err) {
    console.log("There's been an error while syncing the database. Probably the connection failed.");
}

// Simple route for testing purposes
app.get("/", (req, res) => {
    res.send("Room Leaves API");
})

// Initializing express router modules
require("./app/routes/categories.routes")(app);
require("./app/routes/plants.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/scores.routes")(app);
require("./app/routes/favorites.routes")(app);

db.plants.belongsTo(db.categories); // categoryId
db.users.hasOne(db.orders, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.orders.hasOne(db.orderDetails, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.plants.hasOne(db.orderDetails, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.plants.hasOne(db.scores, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.users.hasOne(db.scores, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.plants.hasOne(db.favorites, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
db.users.hasOne(db.favorites, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// Listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});
