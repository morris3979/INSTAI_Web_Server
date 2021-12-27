const { Request, Router } = require('express');
const carnumberRouter = Router({});


carnumberRouter.get('/', function(req, res) {
  res.send('hello world');
});

module.exports = carnumberRouter;