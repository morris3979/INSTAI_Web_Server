const express = require('express');
const { createConnection } = require('typeorm');

const bodyParser = require('body-parser');
const apiRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;

createConnection(); //typeorm connection

app.use(express.static('dist'));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api", apiRouter); // mount api router

app.listen(port, () => console.log(`Listening on port ${port}!`));
