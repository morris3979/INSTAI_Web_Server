const express = require('express');
const apiRouter = express.Router();
const dbRouter = require('./dbRouter');


apiRouter.use("/db", dbRouter);

module.exports = apiRouter;