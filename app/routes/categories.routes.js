module.exports = app => {
    let router = require("express").Router();
    const categories = require("../controllers/categories.controller"); // Here will go categories database controller

    // GET
    // Finds all categories
    router.get("/", categories.findAll);

    // Finds a specific category
    router.get("/:id", categories.findOne);


    // POST
    // Create new category
    router.post("/", categories.create);

    // Update category's data
    router.put("/:id", categories.update);


    // DELETE
    // Remove all the categories
    router.delete("/", categories.deleteAll);

    // Remove a specific category
    /*router.delete("/:id", categories.delete);*/

    app.use("/categories", router);
}

