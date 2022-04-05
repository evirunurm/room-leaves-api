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
app.use(cors())

// Sync database with server
const db = require("./app/db");
try {
    db.sequelize.sync();
} catch (err) {
    console.log(err.message);
}


// Simple route
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
