const express = require('express');
const apiRouter = express.Router();

const awsRouter = require("./api/aws.routes");

const projectRouter = require('./api/project.routes');
const deviceRouter = require('./api/device.routes');
const userRouter = require('./api/user.routes');
const organizationRouter = require('./api/organization.routes');
const dataRouter = require('./api/data.routes');
const labelRouter = require('./api/label.routes');

// cloud
apiRouter.use("/aws", awsRouter);

// database
apiRouter.use('/project', projectRouter);
apiRouter.use('/device', deviceRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/organization', organizationRouter);
apiRouter.use('/data', dataRouter);
apiRouter.use('/label', labelRouter);

module.exports = apiRouter;