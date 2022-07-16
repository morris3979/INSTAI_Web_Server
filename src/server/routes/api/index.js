const express = require('express');
const apiRouter = express.Router();
const carnumberRouter = require("./carnumberRouter");
const eventRouter = require("./eventRouter");
const userRouter = require("./userRouter");

const awsRouter = require("./awsRouter");
const aliyunRouter = require("./aliyunRouter");

apiRouter.use("/carnumber", carnumberRouter);
apiRouter.use("/event", eventRouter);
apiRouter.use("/user", userRouter);

apiRouter.use("/aws", awsRouter);
apiRouter.use("/aliyun", aliyunRouter);

module.exports = apiRouter;