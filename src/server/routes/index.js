const express = require('express');
const apiRouter = express.Router();
const carnumberRouter = require("./carnumberRouter");
const detailRouter = require("./detailRouter");
const userRouter = require("./userRouter");

const awsS3Router = require("./awsS3Router");
apiRouter.use("/S3", awsS3Router);

apiRouter.use("/carnumber", carnumberRouter);
apiRouter.use("/detail", detailRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;