const express = require('express');
const app = express();
const router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function(req, res) {
  res.send('hello world');
});

module.exports = router;