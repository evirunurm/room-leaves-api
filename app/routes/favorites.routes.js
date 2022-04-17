const { authJwt } = require("../middleware");

module.exports = app => {
    const router = require('express').Router();
    const favorites = require("../controllers/favorites.controller");
    
    // Finds all favorites for a user
    router.get("/:userId", [
        authJwt.verifyToken
    ], favorites.findAll);

	// Add to favorite
    router.post("/:userId", [
        authJwt.verifyToken
    ], favorites.create);

    // Delete from favorites
    router.delete("/:userId/:plantId", [
        authJwt.verifyToken
    ], favorites.delete);

   app.use("/favorites", router);
}