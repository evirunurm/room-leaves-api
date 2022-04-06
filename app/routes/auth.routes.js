module.exports = app => {
    let router = require("express").Router();
    const auth = require("../controllers/auth.controller"); // Here will go categories database controller

    // GET
    router.get("/logout", auth.logout);

    // POST
    // Create new user
    router.post("/login", auth.login);

    // Create new user
    router.post("/signup", auth.signup);

    // Update user's data
    router.put("/:id/update", auth.update);

    // DELETE
    // Remove a user
    router.delete("/:id", auth.delete);

    app.use("/", router);
}