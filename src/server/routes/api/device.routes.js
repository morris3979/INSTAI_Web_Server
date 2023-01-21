const express = require('express');
const deviceRouter = express.Router();
const Device = require('../../controllers/device.controller');

// Create a new Device
deviceRouter.post("/", Device.create);

module.exports = [ deviceRouter ];