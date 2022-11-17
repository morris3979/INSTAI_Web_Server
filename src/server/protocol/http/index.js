exports.connect = (app) => {
    require('dotenv').config();
    const path = require('path');
    const http = require('http'); // nodejs http
    const httpPort = process.env.HTTP_PORT;
    const httpServer = http.createServer(app);
    const db = require('../../database');
    const Host = db.Host;
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
            const messageJson = JSON.parse(message.toString()).message;
            const { server, serialNumber, hostName, response } = messageJson;
            const { deviceId, deviceName, message: resMessage } = response;

            if (server) {
                if (server == 'AIServer') {
                    io.to('room').emit('message', resMessage)
                }
            } else if (serialNumber) {
                const findSerialNumber = await Host.findOne({
                    where: { serialNumber: serialNumber },
                });
                // update host (RaspberryPi) response
                if ((!deviceName) && findSerialNumber && serialNumber) {
                    Host.update({
                        response: resMessage
                    }, {
                        where: { serialNumber: serialNumber }
                    });
                    // console.log(`Host (${serialNumber} - ${hostName}): `, resMessage);
                }
                // update device (PAG7681) message
                if (deviceName && findSerialNumber && serialNumber) {
                    Device.update({
                        message: resMessage
                    }, {
                        where: { deviceName: deviceName }
                    });
                    // console.log(`Device (${deviceId} - ${deviceName}): `, resMessage);
                }
            }
            // console.log('message: ', messageJson)
        })
    }

    device.on('connect', () => {
        console.log('=> Connecting to AWS IoT Core!');
        io.to('room').emit('message', 'fetching AI Server ...')
        device.subscribe('fromAIServer', async (err) => {
            if (err) console.log('AWS IoT Core ...err: ', err);
            await onMessage();
        })
        device.subscribe('lobby', async (err) => {
            if (err) console.log('AWS IoT Core ...err: ', err);
            await onMessage();
        })
    });

    httpServer.listen(httpPort, () => console.log(`=> http server listening on port ${httpPort}!`));
}