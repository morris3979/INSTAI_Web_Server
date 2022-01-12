const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const compression = require('compression');
const apiRouter = require('./routes/index');

async function app() {
    const app = express();
    const port = process.env.PORT;

    app.use(bodyParser.json()) // for parsing application/json
    app.use(compression()); // auto compress response
    app.use(express.static('dist'));
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use("/api", apiRouter); // mount api router

    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) // To exit with a 'failure' code
    });

    app.listen(port, () => console.log(`Listening on port ${port}!`));
}

app();