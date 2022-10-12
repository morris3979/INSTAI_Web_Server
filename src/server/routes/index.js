const express = require('express');
const apiRouter = express.Router();

const awsRouter = require("./api/aws.routes");
const aliyunRouter = require("./api/aliyun.routes");

const projectRouter = require('./api/project.routes');
const hostRouter = require('./api/host.routes');
const deviceRouter = require('./api/device.routes');
const eventRouter = require('./api/event.routes');
const userRouter = require('./api/user.routes');

const Details = require('../controllers/details.controller');

// cloud
apiRouter.use("/aws", awsRouter);
apiRouter.use("/aliyun", aliyunRouter);

// database
apiRouter.use('/project', projectRouter);
apiRouter.use('/host', hostRouter);
apiRouter.use('/device', deviceRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/user', userRouter);

// Update a Details with id
apiRouter.patch("/event/details/:id", Details.update);

module.exports = apiRouter;