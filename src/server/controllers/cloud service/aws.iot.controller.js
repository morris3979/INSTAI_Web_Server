const path = require('path');
const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
    keyPath: path.resolve(__dirname, '../../certs/private.pem.key'),
    certPath: path.resolve(__dirname, '../../certs/certificate.pem.crt'),
    caPath: path.resolve(__dirname, '../../certs/AmazonRootCA1.pem'),
    clientId: 'lab321_carview',
        host: 'a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com',
});

const topicHouse1 = "send_topic";
const topicHouse2 = "receive_topic";

device.on('connect', function() {
    console.log('Connect AWS IOT Server Success ...');
    device.subscribe(topicHouse2);
    device.publish(topicHouse1, JSON.stringify(Data));
    // console.log('Message send successfully ...');
});

device
.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});

const deviceData = {
    serialNumber: "0x0001",
    device: "AAA-0001",
    type: "MyIoTDevice",
    message: {}
}
const Data = {
    ...deviceData,
    message: 'update module ...'
}

class IotController {
    static async publish(req, res) {
        device.on('connect', function(topic, payload) {
            device.publish(topicHouse1, JSON.stringify(Data));
            console.log('message', topic, payload.toString(Data));

            return res.status(200).json({
                message: 'Message send successfully ...',
            });
        });
    }
}

module.exports = { IotController }