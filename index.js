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
    res.sendFile("Room Leaves API");
})

// Importing express router modules
/*const plants = require('./app/routes/plants.routes');*/
/*const clients = require('./app/routes/clients.routes');*/
const categories = require('./app/routes/categories.routes');
// const orders = require('');

// Loading router modules
// app.use('/plants', plants);
// app.use('/clients', clients);
app.use('/categories', categories);
// app.use('/orders', orders);

// Listen for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});
