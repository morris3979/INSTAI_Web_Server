require('dotenv').config();
const path = require('path');
const db = require('../../database');
const Host = db.Host;
const Device = db.Device;

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({
    endpoint: process.env.AWS_IOT_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const awsIot = require('aws-iot-device-sdk');
const device = awsIot.device({
    host: process.env.AWS_IOT_ENDPOINT,
    clientId: 'lab321_carview',
    keyPath: path.resolve(__dirname, '../../certs/private.pem.key'),
    certPath: path.resolve(__dirname, '../../certs/certificate.pem.crt'),
    caPath: path.resolve(__dirname, '../../certs/AmazonRootCA1.pem'),
});

// aws iot mqtt publish
exports.publish = (topic, message) => {
    const params = {
        topic: topic,
        payload: JSON.stringify({message}),
        qos: 1
    };

    iotData.publish(params, function(err, data){
        if(err){
            console.log("Error occurred: ", err, err.stack);
            return err;
        } else {
            // console.log("Data: ", data);
            return data;
        }
    });
};

// aws iot mqtt subscribe
exports.receive = () => {
    device
    .on('connect', () => {
        console.log('=> Connecting to AWS IoT Core!');
        device.subscribe('lobby', (err) => {
            if (err) console.log('AWS IoT Core ...err: ', err);
            device
            .on('message', async (topic, message) => {
                const messageJson = JSON.parse(message.toString()).message;
                const { serialNumber, hostName, response } = messageJson;
                const { deviceId, deviceName, message: resMessage } = response;
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
                    console.log(`Host (${serialNumber} - ${hostName}): `, resMessage);
                }

                // update device (PAG7681) message
                if (deviceName && findSerialNumber && serialNumber) {
                    Device.update({
                        message: resMessage
                    }, {
                        where: { deviceName: deviceName }
                    });
                    console.log(`Device (${deviceId} - ${deviceName}): `, resMessage);
                }
            });
        })
    });
}