const { authJwt } = require("../middleware");

module.exports = app => {
    const router = require('express').Router();
    const users = require("../controllers/users.controller"); // Here will go the users database controller

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Authorization, Origin, Content-Type, Accept",
        );
        next();
    });

    // GET
    // TODO: Delete, TEST only
    // Finds all users
    router.get("/", users.findAll);

    // Finds a specific client
    router.post("/:id", [
        authJwt.verifyToken
    ], users.findOne);

    // Update client's data
    router.put("/:id", [
        authJwt.verifyToken
    ], users.update);

    // Remove a specific client
    router.delete("/:id", [
        authJwt.verifyToken
    ], users.delete);

    // TODO: Delete
   /* // POST
    // Create new client
    router.post("/", users.create);*/

    // DELETE
    // Remove all the users
    router.delete("/", users.deleteAll);

    // Export router, so it can be "used" in the Main app, where it's imported.
    app.use("/users", router);
}