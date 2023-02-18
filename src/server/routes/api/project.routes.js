const express = require('express');
const projectRouter = express.Router();
const Project = require('../../controllers/project.controller');

// Create a new Project
projectRouter.post("/", Project.create);

// Update a Project with id
projectRouter.patch("/:id", Project.update);

// Find a specify Project
projectRouter.get("/:id", Project.findProject);

// Find all Data From a Project
projectRouter.get("/:id/data", Project.findData);

// Find all Devices From a Project
projectRouter.get("/:id/device", Project.findDevice);

// Find all Labels From a Project
projectRouter.get("/:id/label", Project.findLabel);

module.exports = [ projectRouter ];