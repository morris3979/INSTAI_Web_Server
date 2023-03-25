const express = require('express');
const modelRouter = express.Router();
const Model = require('../../controllers/model.controller');

// Create a new Device
modelRouter.post("/", Model.create);

// Model Bind Data
modelRouter.post("/group", Model.bindModelData);

module.exports = [ modelRouter ];