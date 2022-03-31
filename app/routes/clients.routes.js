const express = require('express');
const router = express.Router();
const clients = require(""); // Here will go the clients database controller

// GET

// Finds a specific client
router.get("/:id", clients.findOne);

// POST
// Create new client
router.post("/", clients.create);

// Update client's data
router.put("/:id", clients.update);

// DELETE
// Remove all the clients
router.delete("/", clients.deleteAll);

// Remove a specific client
router.delete("/:id", clients.delete);

// Export router, so it can be "used" in the Main app, where it's imported.
module.exports = router;