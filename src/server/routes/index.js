const express = require('express');
const apiRouter = express.Router();

const awsRouter = require("./api/aws.routes");
const aliyunRouter = require("./api/aliyun.routes");

const projectRouter = require('./api/project.routes');
const groupRouter = require('./api/group.routes');
const userRouter = require('./api/user.routes');

apiRouter.use("/aws", awsRouter);
apiRouter.use("/aliyun", aliyunRouter);

apiRouter.use('/project', projectRouter);
apiRouter.use('/group', groupRouter);
apiRouter.use('/user', userRouter);


module.exports = apiRouter;