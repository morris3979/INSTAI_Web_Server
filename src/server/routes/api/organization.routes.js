const express = require('express');
const organizationRouter = express.Router();
const Organization = require('../../controllers/organization.controller');

// Create a new Project
organizationRouter.post("/", Organization.create);

// Find User Owned Projects
organizationRouter.get("/:id", Organization.findProjects);

module.exports = [ organizationRouter ];