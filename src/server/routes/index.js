const express = require('express');
const apiRouter = express.Router();
const carnumberRouter = require("./carnumberRouter");
const detailsRouter = require("./detailsRouter");
const userRouter = require("./userRouter");

const awsS3Router = require("./awsS3Router");
apiRouter.use("/S3", awsS3Router);

apiRouter.use("/carnumber", carnumberRouter);
apiRouter.use("/details", detailsRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;