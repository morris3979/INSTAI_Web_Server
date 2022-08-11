const express = require('express');
const groupRouter = express.Router();
const Group = require('../../controllers/group.controller');


// Create a new Group
groupRouter.post("/", Group.create);

// Retrieve all Group
groupRouter.get('/', Group.findAll);

// Update a Group with id
// groupRouter.patch("/:id", Group.update);

// Delete a Group with id
// groupRouter.delete("/:id", Group.delete);

module.exports = [ groupRouter ];