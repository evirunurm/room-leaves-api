const { verifySignUp } = require("../middleware");
const auth = require("../controllers/auth.controller");

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
          "Access-Control-Allow-Headers",
          "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    let router = require("express").Router();

    // GET
    // router.get("/logout", auth.logout);

    // POST
    // Create new user
    router.post("/login",[
        verifySignUp.checkDuplicateEmail
    ], auth.login);

    // Create new user
    router.post("/signup", auth.signup);

    // Update user's data
    // router.put("/:id/update", auth.update);

    // DELETE
    // Remove a user
    // router.delete("/:id", auth.delete);

    app.use("/auth", router);
}