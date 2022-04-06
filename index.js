const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
// 1. Checks for cookies with specified name.
// If found: Looks up its value in the store. Then it will populate req.session.
// If not found / value not found in store: Creates new value for specified name and a new req.session.
// "saveUninitialized:false" --> It won't be saved to the store unless changed
// 2. If req.session is changed, it gets saved to the store and a cookie gets created in res.
app.use(session({
    secret: process.env.SESSIONSECRET,
    name: "",
    cookie: {
        maxAge: DAY
    },
    resave: false,
    saveUninitialized: true,

}));
// So that the server can save/read/access a cookie.
app.use(cookieParser());

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
