const express = require('express');
const projectRouter = express.Router();
const Project = require('../../controllers/project.controller');

// Create a new Project
projectRouter.post("/", Project.create);

// Update a Project with id
projectRouter.patch("/:id", Project.update);

module.exports = [ projectRouter ];