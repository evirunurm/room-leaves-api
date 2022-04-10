const { authJwt } = require("../middleware");

module.exports = app => {
    const router = require('express').Router();
    const users = require("../controllers/users.controller"); // Here will go the users database controller

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    // GET
    // Finds all users
    router.get("/", users.findAll);

    // Finds a specific client
    router.get("/:id", users.findOne);

    // POST
    // Create new client
    router.post("/", users.create);

    // Update client's data
    router.put("/:id", users.update);

    // DELETE
    // Remove all the users
    router.delete("/", users.deleteAll);

    // Remove a specific client
    router.delete("/:id", users.delete);

    // Export router, so it can be "used" in the Main app, where it's imported.
    app.use("/users", router);
}