const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 80;

// Create express Main application
const app = express();

// Common express middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Sync database with server
const db = require("./app/db");
db.sequelize.sync();

// Simple route
app.get("/", (req, res) => {
    res.send("Room Leaves API");
})

// Initializing express router modules
require("./app/routes/categories.routes")(app);
require("./app/routes/plants.routes")(app);
require("./app/routes/clients.routes")(app);
// require("./app/routes/orders.routes")(app); TODO: uncomment

db.plants.belongsTo(db.categories, {as: "category"}); // categoryId


// Listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});
