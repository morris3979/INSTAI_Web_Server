const AWS = require('aws-sdk');
require('dotenv').config();
const db = require('../../database');
const Host = db.Host;
const Device = db.Device;

const iotData = new AWS.IotData({
    endpoint: process.env.AWS_IOT_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
    const awsIot = require('aws-iot-device-sdk');
    const path = require('path');
    const topic = 'lobby';
    const device = awsIot.device({
        host: process.env.AWS_IOT_ENDPOINT,
        clientId: 'lab321_carview',
        keyPath: path.resolve(__dirname, '../../certs/private.pem.key'),
        certPath: path.resolve(__dirname, '../../certs/certificate.pem.crt'),
        caPath: path.resolve(__dirname, '../../certs/AmazonRootCA1.pem'),
    });

    device
    .on('connect', function () {
        console.log('=> Connecting to AWS IoT Core!');
        device.subscribe(topic, function (err) {
            if (!err) {
                device
                .on('message', async function (topic, message) {
                    const messageJson = JSON.parse(message.toString()).message;
                    const serialNumber = messageJson.serialNumber;
                    const response = messageJson.response;
                    const deviceId = response.deviceId;
                    const deviceMessage = response.message;
                    const findSerialNumber = await Host.findOne({
                        where: { serialNumber: serialNumber },
                    });
                    const findDeviceId = await Device.findOne({
                        where: { deviceId: deviceId },
                    });

                    // update host (RasPi) response
                    if (findSerialNumber && serialNumber && (!deviceId)) {
                        Host.update({
                            response: response
                        }, {
                            where: { serialNumber: serialNumber }
                        });
                        console.log('serialNumber: ', serialNumber);
                        console.log('response: ', response);
                    }

                    // update device (PAG) message
                    if (findSerialNumber && serialNumber && findDeviceId && deviceId) {
                        Device.update({
                            message: deviceMessage
                        }, {
                            where: { deviceId: deviceId }
                        });
                        console.log('deviceId: ', deviceId);
                        console.log('message: ', deviceMessage);
                    }

                    console.log(`Message incoming topic(${topic}):`, messageJson);
                });
            }
        })
    });
}