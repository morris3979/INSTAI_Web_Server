const AWS = require('aws-sdk');
require('dotenv').config();

const iotData = new AWS.IotData({
    endpoint: process.env.AWS_IOT_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.publish = (topic, message) => {
    const params = {
        topic: topic,
        payload: JSON.stringify({message}),
        qos: 1
    };
    iotData.publish(params, function(err, data){
        if(err){
            console.log("Error occurred : ", err, err.stack);
            return err;
        } else {
            // console.log("Data: ", data);
            return data;
        }
    });
};

exports.receive = () => {
    // aws iot mqtt subscribe
    const awsIot = require('aws-iot-device-sdk');
    const path = require('path');
    const mqttBroker = 'a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com';
    const topic = '0x0001'

    const device = awsIot.device({
        host: mqttBroker,
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
                    .on('message', function (topic, payload) {
                        console.log(`Message incoming topic(${topic}):`, payload.toString());
                    });
            }
        })
    });
}