const express = require('express');
const organizationRouter = express.Router();
const Organization = require('../../controllers/organization.controller');

// Retrieve all User
organizationRouter.get("/:id", Organization.findOne);

module.exports = [ organizationRouter ];