const express = require('express');
const detailsRouter = express.Router();
const Details = require('../../controllers/details.controller');

// Retrieve all Device
detailsRouter.get('/', Details.findAll);

// Update a Details with id
detailsRouter.patch("/:id", Details.update);

module.exports = [ detailsRouter ];