exports.connect = (app) => {
    require('dotenv').config();
    const path = require('path');
    const https = require('https'); // nodejs https
    const httpsPort = process.env.HTTPS_PORT;
    const fs = require('fs');
    const db = require('../../database');
    const Device = db.Device;

    const privateKey = fs.readFileSync(__dirname + '/ssl/privatekey.pem');
    const certificate = fs.readFileSync(__dirname + '/ssl/certificate.pem');
    const credentials = {
        key: privateKey,
        cert: certificate
    };
    const httpsServer = https.createServer(credentials, app);

    const socketIo = require('socket.io')
    const io = socketIo(httpsServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        // console.log('client connected: ', socket.id)
        socket.join('room')
        socket.on('disconnect', (reason) => {
            // console.log(reason)
            return
        })
    })

    setInterval(() => {
        io.to('room').emit('time', new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))
    }, 1000)

    const awsIot = require('aws-iot-device-sdk');
    const device = awsIot.device({
        host: process.env.AWS_IOT_ENDPOINT,
        clientId: 'lab321_carview',
        keyPath: path.resolve(__dirname, '../../certs/private.pem.key'),
        certPath: path.resolve(__dirname, '../../certs/certificate.pem.crt'),
        caPath: path.resolve(__dirname, '../../certs/AmazonRootCA1.pem'),
    });

    const onMessage = () => {
        device.on('message', async (topic, message) => {
            const messageJson = JSON.parse(message.toString());
            // console.log('messageJson', messageJson)
            await Device.update({
                message: messageJson.message
            }, {
                where: { serialNumber: messageJson.serialNumber }
            });
            io.to('room').emit('lobby', messageJson.serialNumber);
        })
    }

    device.on('connect', () => {
        console.log('=> Connecting to AWS IoT Core!');
        device.subscribe('lobby', async (err) => {
            if (err) console.log('AWS IoT Core ...err: ', err);
            await onMessage();
        })
    });

    httpsServer.listen(httpsPort, () => console.log(`=> https server listening on port ${httpsPort}!`));
}