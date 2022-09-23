const express = require('express');
const eventRouter = express.Router();
const Event = require('../../controllers/event.controller');

// Retrieve all Device
eventRouter.get('/', Event.findAll);

module.exports = [ eventRouter ];