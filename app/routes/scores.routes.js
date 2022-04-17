const { authJwt } = require("../middleware");

module.exports = app => {
	const router = require('express').Router();
    const scores = require("../controllers/scores.controller"); // Here will go the scores database controller

	// Finds a specific client
    router.post("/", [
        authJwt.verifyToken
    ], scores.create);

    // Update client's data
    router.put("/:id", [
        authJwt.verifyToken
    ], scores.update);

	app.use("/scores", router);
}