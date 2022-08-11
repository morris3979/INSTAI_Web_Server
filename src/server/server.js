const express = require('express');
require('dotenv').config();
const fs = require('fs');

async function app() {
    const app = express();
    const http = require('http');
    const https = require('https');
    const httpPort = process.env.HTTP_PORT;
    const httpsPort = process.env.HTTPS_PORT;
    const privateKey = fs.readFileSync(__dirname + '/ssl/privatekey.pem');
    const certificate = fs.readFileSync(__dirname + '/ssl/certificate.pem');
    const credentials = {
        key: privateKey,
        cert: certificate
    };
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    const bodyParser = require('body-parser');
    const compression = require('compression');
    const apiRouter = require('./routes/index'); //db routes
    const pageRouter = require('./routes/api/page.routes'); //page routes

    const db = require('./database');

    db.sequelize.authenticate().then(() => {
        // console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
    db.sequelize.sync({ alter: true });

    app.use(bodyParser.json()) // for parsing application/json
    app.use(compression()); // auto compress response
    app.use(express.static('dist')); // serve frontend file
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(pageRouter); // serve html on frontend route
    app.use('/api', apiRouter); // mount api router

    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) //To exit with a 'failure' code
    });

    httpServer.listen(httpPort, () => console.log(`=> local server listening on port ${httpPort}!`));
    httpsServer.listen(httpsPort, () => console.log(`=> https server listening on port ${httpsPort}!`));
}

app();