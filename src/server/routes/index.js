const express = require('express');
const apiRouter = express.Router();

const awsRouter = require("./api/aws.routes");

const projectRouter = require('./api/project.routes');
const hostRouter = require('./api/host.routes');
const deviceRouter = require('./api/device.routes');
const userRouter = require('./api/user.routes');
const organizationRouter = require('./api/organization.routes');

// cloud
apiRouter.use("/aws", awsRouter);

// database
apiRouter.use('/project', projectRouter);
apiRouter.use('/host', hostRouter);
apiRouter.use('/device', deviceRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/organization', organizationRouter);

module.exports = apiRouter;