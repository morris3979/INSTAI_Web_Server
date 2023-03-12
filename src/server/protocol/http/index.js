exports.connect = (app) => {
    require('dotenv').config();
    const path = require('path');
    const http = require('http'); // nodejs http
    const httpPort = process.env.HTTP_PORT;
    const httpServer = http.createServer(app);
    const db = require('../../database');
    const Device = db.Device;

    const socketIo = require('socket.io')
    const io = socketIo(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log('client connected: ', socket.id)
        socket.join('room')
        socket.on('disconnect', (reason) => {
          console.log(reason)
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
            io.to('room').emit('lobby');
        })
    }

    device.on('connect', () => {
        console.log('=> Connecting to AWS IoT Core!');
        device.subscribe('lobby', (err) => {
            if (err) console.log('AWS IoT Core ...err: ', err);
            onMessage();
        })
    });

    httpServer.listen(httpPort, () => console.log(`=> http server listening on port ${httpPort}!`));
}