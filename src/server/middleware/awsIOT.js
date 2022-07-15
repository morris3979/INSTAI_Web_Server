const path = require('path');
const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
    keyPath: path.resolve(__dirname, '../certs/private.pem.key'),
    certPath: path.resolve(__dirname, '../certs/certificate.pem.crt'),
    caPath: path.resolve(__dirname, '../certs/AmazonRootCA1.pem'),
    clientId: 'lab321_carview',
        host: 'a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com',
});

function awsIotMqtt() {
    device
        .on('connect', function() {
            console.log('Connect to AWS IOT ...');
            device.subscribe('receive_topic');
            device.publish('send_topic', JSON.stringify({ test_data: 'test msg from macBook ...'}));
            console.log('Message send successfully ...');
        });
    device
        .on('message', function(topic, payload) {
            console.log('message', topic, payload.toString());
        });
}

module.exports = awsIotMqtt;