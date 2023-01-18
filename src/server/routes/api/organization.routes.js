const express = require('express');
const organizationRouter = express.Router();
const Organization = require('../../controllers/organization.controller');

// Create a new Project
organizationRouter.post("/", Organization.create);

// Find User Owned Projects
organizationRouter.get("/:id/projects", Organization.findProjects);

// Get Organization Users
organizationRouter.get("/:id/users", Organization.findUsers);

module.exports = [ organizationRouter ];