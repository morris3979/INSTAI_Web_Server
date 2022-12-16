const express = require('express');
const cors = require('cors');
require('dotenv').config();

async function app() {
    const app = express();
    const corsOptions = {
        origin: [
            'http://localhost:8080',
            'https://localhost:8443',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods'
        ],
    };
    const bodyParser = require('body-parser');
    const compression = require('compression');
    const apiRouter = require('./routes/index'); // db routes
    const pageRouter = require('./routes/api/page.routes'); // page routes
    const db = require('./database');
    // const tcp = require('./protocol/tcp/index');
    const http = require('./protocol/http/index');
    const https = require('./protocol/https/index');

    // check connection is OK
    db.sequelize.authenticate().then(() => {
        console.log("=> Database connected successfully!");
    }).catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit(1);
    });
    // creates the table if it doesn't exist.
    db.sequelize.sync(
        { alter: true } // performs the necessary changes in the table to make it match the model.
        // { force: true } // creates the table, dropping it first if it already existed.
    );

    app.use(cors(corsOptions));
    app.use(bodyParser.json()) // for parsing application/json
    app.use(compression()); // auto compress response
    app.use(express.static('dist')); // serve frontend file
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(pageRouter); // serve html on frontend route
    app.use('/api', apiRouter); // mount api router

    // process.setMaxListeners(0); // turn off the limit for listener
    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) // To exit with a 'failure' code
    });
    require('events').defaultMaxListeners = 100; // fix (node) warning: possible EventEmitter memory leak detected. 11 listeners added.

    // tcp.connect();
    http.connect(app);
    https.connect(app);
}

app();