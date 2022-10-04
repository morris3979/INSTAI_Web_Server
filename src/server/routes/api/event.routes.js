const express = require('express');
const eventRouter = express.Router();
const Event = require('../../controllers/event.controller');

// Retrieve all Event
eventRouter.get('/', Event.findAll);

// Retrieve Event by Device
eventRouter.get('/:id', Event.findByDevice);

module.exports = [ eventRouter ];