const express = require('express');
const router = express.Router();
const clients = require(""); // Here will go the clients database controller

// GET

// Finds one
router.get("/:id", clients.findOne);

// POST
// Create new plant
router.post("/", clients.create);

// Update plant's data
router.put("/:id", clients.update);

// DELETE
// Remove all the plants
router.delete("/", clients.deleteAll);

// Remove a specific plant
router.delete("/:id", clients.delete);

// Export router, so it can be "used" in the Main app, where it's imported.
module.exports = router;