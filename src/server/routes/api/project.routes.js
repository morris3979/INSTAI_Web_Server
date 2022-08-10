const express = require('express');
const projectRouter = express.Router();
const Project = require('../../controllers/project.controller');


// Create a new Project
projectRouter.post("/", Project.create);

// Retrieve all Project
projectRouter.get('/', Project.findAll);

// Update a Tutorial with id
projectRouter.patch("/:id", Project.update);

// Delete a Tutorial with id
projectRouter.delete("/:id", Project.delete);

module.exports = [ projectRouter ];