const express = require('express');
const deviceRouter = express.Router();
const Device = require('../../controllers/device.controller');


// Create a new Device
deviceRouter.post("/", Device.create);

// Retrieve all Device
deviceRouter.get('/', Device.findAll);

// Update a Device with id
deviceRouter.patch("/:id", Device.update);

// Delete a Device with id
// deviceRouter.delete("/:id", Device.delete);

module.exports = [ deviceRouter ];