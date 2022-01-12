const express = require('express');
const apiRouter = express.Router();
const carnumberRouter = require("./carnumberRouter");
const userRouter = require("./userRouter")

apiRouter.use("/carnumber", carnumberRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;