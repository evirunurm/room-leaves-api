module.exports = app => {
    const router = require('express').Router();
    const plants = require("../controllers/plants.controller.js"); // Here will go the plants database controller

    // GET
    // Retrieves both all plants, or some in case a query is specified
    router.get("/", plants.findAll);

    // Finds one
    router.get("/:id", plants.findOne);

    // POST
    // Create new plant
    router.post("/", plants.create);

    // Update plant's data
    router.put("/:id", plants.update);

    // DELETE
    // Remove all the plants
    router.delete("/", plants.deleteAll);

    // Remove a specific plant
    router.delete("/:id", plants.delete);

    app.use("/plants", router);
}


