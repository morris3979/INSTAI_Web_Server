const express = require('express');
const modelRouter = express.Router();
const Model = require('../../controllers/model.controller');


// Create a new Model
modelRouter.post("/", Model.create);

// Retrieve all Model
modelRouter.get('/', Model.findAll);

// Update a Model with id
// modelRouter.patch("/:id", Model.update);

// Delete a Model with id
modelRouter.delete("/:id", Model.delete);

module.exports = [ modelRouter ];