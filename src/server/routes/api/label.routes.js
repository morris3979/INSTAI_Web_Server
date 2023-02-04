const express = require('express');
const labelRouter = express.Router();
const Label = require('../../controllers/label.controller');

// Create a new Device
labelRouter.post("/", Label.create);

module.exports = [ labelRouter ];