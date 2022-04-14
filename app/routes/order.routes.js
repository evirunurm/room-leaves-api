const { authJwt } = require("../middleware");

module.exports = app => {
    const router = require('express').Router();
    const orders = require("../controllers/users.controller");

    // TODO: Check how can I change order and create orders by user in a secure way, without the possibility of an unathorized user to add orders to another user if they know their id.

    // Create an order
    router.post("/:userId", [
        authJwt.verifyToken
    ], orders.create);

    // Finds a specific order
    router.post("/:userId/:id", [
        authJwt.verifyToken
    ], orders.findOne);

    // Finds a all order for a user
    router.post("/:userId", [
        authJwt.verifyToken
    ], orders.findAll);

    // Update an order
    router.put("/:userId/:id", [
        authJwt.verifyToken
    ], orders.update);

    app.use("/orders", router);
}