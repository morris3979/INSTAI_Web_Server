const express = require('express');
const apiRouter = express.Router();
const carnumberRouter = require("./carnumberRouter");
const detailRouter = require("./detailRouter");
const userRouter = require("./userRouter");

apiRouter.use("/carnumber", carnumberRouter);
apiRouter.use("/detail", detailRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;