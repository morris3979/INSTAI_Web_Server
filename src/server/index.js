const express = require('express');
const { createConnection } = require('typeorm');

const bodyParser = require('body-parser');
const compression = require('compression');
const apiRouter = require('./routes/index');

async function app() {
    const app = express();
    const port = process.env.PORT || 8080;

    await createConnection(); //typeorm connection

    app.use(bodyParser.json()) // for parsing application/json
    app.use(compression()); // auto compress response
    app.use(express.static('dist'));
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use("/api", apiRouter); // mount api router

    app.listen(port, () => console.log(`Listening on port ${port}!`));
}

app();