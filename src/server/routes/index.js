const express = require('express');
const apiRouter = express.Router();

const awsRouter = require("./api/aws.routes");
const aliyunRouter = require("./api/aliyun.routes");

const projectRouter = require('./api/project.routes');
const hostRouter = require('./api/host.routes');
const modelRouter = require('./api/model.routes');
const deviceRouter = require('./api/device.routes');
const userRouter = require('./api/user.routes');

apiRouter.use("/aws", awsRouter);
apiRouter.use("/aliyun", aliyunRouter);

apiRouter.use('/project', projectRouter);
apiRouter.use('/host', hostRouter);
apiRouter.use('/model', modelRouter);
apiRouter.use('/device', deviceRouter);
apiRouter.use('/user', userRouter);


module.exports = apiRouter;