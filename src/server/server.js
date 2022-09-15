const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const readlineSync = require('readline-sync');

async function app() {
    const app = express();
    const net = require('net'); // nodejs tcp
    const http = require('http'); // nodejs http
    const https = require('https'); // nodejs https
    const tcpPort = process.env.TCP_PORT;
    const httpPort = process.env.HTTP_PORT;
    const httpsPort = process.env.HTTPS_PORT;
    const privateKey = fs.readFileSync(__dirname + '/ssl/privatekey.pem');
    const certificate = fs.readFileSync(__dirname + '/ssl/certificate.pem');
    const credentials = {
        key: privateKey,
        cert: certificate
    };
    const corsOptions = {
        origin: [
          'http://www.example.com',
          'http://localhost:8080',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
    const tcpServer = net.createServer();
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    const bodyParser = require('body-parser');
    const compression = require('compression');
    const apiRouter = require('./routes/index'); // db routes
    const pageRouter = require('./routes/api/page.routes'); // page routes

    const db = require('./database');

    // check connection is OK
    db.sequelize.authenticate().then(() => {
        console.log("=> Database connected successfully!");
    }).catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit(1);
    });
    // performs the necessary changes in the table to make it match the model
    db.sequelize.sync({alter: true});

    app.use(cors(corsOptions));
    app.use(bodyParser.json()) // for parsing application/json
    app.use(compression()); // auto compress response
    app.use(express.static('dist')); // serve frontend file
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(pageRouter); // serve html on frontend route
    app.use('/api', apiRouter); // mount api router

    process.on('unhandledRejection', error => {
        console.error('unhandledRejection', error);
        process.exit(1) // To exit with a 'failure' code
    });

    // aws iot mqtt subscribe
    const awsIot = require('aws-iot-device-sdk');
    const path = require('path');
    const mqttBroker = 'a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com';
    const topic = '0x0001'

    const device = awsIot.device({
        host: mqttBroker,
        clientId: 'lab321_carview',
        keyPath: path.resolve(__dirname, './certs/private.pem.key'),
        certPath: path.resolve(__dirname, './certs/certificate.pem.crt'),
        caPath: path.resolve(__dirname, './certs/AmazonRootCA1.pem'),
    });

    device
    .on('connect', function () {
        console.log('=> Connecting to AWS IoT Core!');
        device.subscribe(topic, function (err) {
            if (!err) {
                device
                    .on('message', function (topic, payload) {
                        console.log(`Message incoming topic(${topic}):`, payload.toString());
                    });
            }
        })
    });

    // tcp server connection
    tcpServer.on('connection', function (socket) {
        const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
        console.log('server: new client connection is made %s', remoteAddress);
        tcpServer.getConnections(function (err, count) {
            console.log("The number of currently connection is: " + count);
        });

        socket.on("data", function (d) {
            console.log('Data from %s: %s', remoteAddress, d);
        });

        socket.write(readlineSync.question("Enter data to send: "));

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