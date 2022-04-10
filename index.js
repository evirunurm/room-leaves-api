const express = require("express");
const cors = require("cors");

// Constants
const PORT = process.env.PORT || 80;
const DAY = 1000 * 60 * 60 * 24;

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
    db.sequelize.sync();
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
// require("./app/routes/orders.routes")(app); TODO: uncomment

db.plants.belongsTo(db.categories, {as: "category"}); // categoryId


// Listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});
