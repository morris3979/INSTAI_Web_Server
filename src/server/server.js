const express = require('express');
require('dotenv').config();
const fs = require('fs');
const readlineSync = require('readline-sync');

async function app() {
    const app = express();
    const net = require('net');
    const http = require('http');
    const https = require('https');
    const tcpPort = process.env.TCP_PORT;
    const httpPort = process.env.HTTP_PORT;
    const httpsPort = process.env.HTTPS_PORT;
    const privateKey = fs.readFileSync(__dirname + '/ssl/privatekey.pem');
    const certificate = fs.readFileSync(__dirname + '/ssl/certificate.pem');
    const credentials = {
        key: privateKey,
        cert: certificate
    };
    const tcpServer = net.createServer();
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    const bodyParser = require('body-parser');
    const compression = require('compression');
    const apiRouter = require('./routes/index'); //db routes
    const pageRouter = require('./routes/api/page.routes'); //page routes

    const db = require('./database');

    db.sequelize.authenticate().then(() => {
        console.log("Connected to the database!");
    }).catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit(1);
    });
    db.sequelize.sync({alter: true});

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

    tcpServer.on('connection', function (socket) {
        const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
        console.log('server: new client connection is made %s', remoteAddress);
        tcpServer.getConnections(function (err, count) {
            console.log("The number of currently connection is: " + count);
        });

        var clients = [];
        clients.push(socket);
        // console.log("clients: ", clients);
        // const data = readlineSync.question("Enter data to send: ");
        // clients[0].write(data);

        socket.on("data", function (d) {
            console.log('Data from %s: %s', remoteAddress, d);
            socket.write("Hello "+ d);
        });

        socket.once("close", function () {
            console.log("Connection from %s closed", remoteAddress);
            tcpServer.getConnections(function (err, count) {
                console.log("The number of currently connection is: " + count);
            });
        })

        socket.on("error", function (err) {
            console.log('Connection %s error: %s', remoteAddress, err.message);
        });
    })

    tcpServer.listen(tcpPort, () => console.log(`=> tcp server listening on port ${tcpPort}!`));
    httpServer.listen(httpPort, () => console.log(`=> http server listening on port ${httpPort}!`));
    httpsServer.listen(httpsPort, () => console.log(`=> https server listening on port ${httpsPort}!`));
}

app();