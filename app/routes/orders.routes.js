const { authJwt } = require("../middleware");

module.exports = app => {
    const router = require('express').Router();
    const orders = require("../controllers/orders.controller");



    // Finds a specific order
/*    router.get("/:userId/:id", [
        authJwt.verifyToken
    ], orders.findOne);*/

    // Finds all orders for a user
    router.get("/:userId", [
        authJwt.verifyToken
    ], orders.findAll);

        // Create an order
    router.post("/:userId", [
        authJwt.verifyToken
    ], orders.create);

    // Update an order
    router.put("/:userId/:id", [
        authJwt.verifyToken
    ], orders.update);

   app.use("/orders", router);
}