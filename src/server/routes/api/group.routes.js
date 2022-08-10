const express = require('express');
const groupRouter = express.Router();
const Group = require('../../controllers/group.controller');


// Create a new Project
groupRouter.post("/", Group.create);

// Retrieve all Project
groupRouter.get('/', Group.findAll);

// Update a Tutorial with id
// groupRouter.patch("/:id", Group.update);

// Delete a Tutorial with id
// groupRouter.delete("/:id", Group.delete);

module.exports = [ groupRouter ];