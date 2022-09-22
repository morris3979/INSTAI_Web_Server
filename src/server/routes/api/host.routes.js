const express = require('express');
const hostRouter = express.Router();
const Host = require('../../controllers/host.controller');


// Create a new Host
hostRouter.post("/", Host.create);

// Retrieve all Host
hostRouter.get('/', Host.findAll);

// Update a Host with id
hostRouter.patch("/:id", Host.update);

// Delete a Host with id
hostRouter.delete("/:id", Host.delete);

module.exports = [ hostRouter ];