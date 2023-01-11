const express = require('express');
const dataRouter = express.Router();
const Data = require('../../controllers/data.controller');

// Create a new Data
dataRouter.post("/", Data.upload);

module.exports = [ dataRouter ];