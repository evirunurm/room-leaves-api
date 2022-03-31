const express = require("express");
const router = express.Router;
const categories = require(""); // Here will go categories database controller

// GET
// Finds a specific category
router.get("/:id", categories.findOne);

// Finds all categories
router.get("/", categories.findAll);


// POST
// Create new category
router.post("/", categories.create);

// Update category's data
router.put("/:id", categories.update);


// DELETE
// Remove all the categories
router.delete("/", categories.deleteAll);

// Remove a specific category
router.delete("/:id", categories.delete);

module.exports = router;
